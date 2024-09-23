import { useState, useEffect, useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { getArticles } from '@/services/ArticleAPI';
import SortDropdown from '@/components/board/sortDropdown';
import ArticleCard from './articleListCard/articleListCard';

type ArticleOrder = 'like' | 'recent';

interface ArticleListProps {
  searchValue?: string; // 검색어를 받을 prop 추가
}

function ArticleList({ searchValue }: ArticleListProps) {
  const [orderBy, setOrderBy] = useState<ArticleOrder>('recent');
  const pageSize = 4;

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery<Articles, Error>({
    queryKey: ['articles', orderBy, searchValue],
    queryFn: ({ pageParam = 1 }) => {
      const page = typeof pageParam === 'number' ? pageParam : undefined;
      return getArticles(page, pageSize, orderBy, searchValue);
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.list.length < pageSize) {
        return undefined;
      }
      return allPages.length + 1;
    },
    initialPageParam: 1,
    staleTime: 0,
  });

  // useInView 훅 사용하여 마지막 게시글 감지
  const { ref: lastArticleRef, inView } = useInView({
    threshold: 0.1, // 10% 보이면 트리거
    triggerOnce: false,
  });

  // inView 상태가 true일 때 다음 페이지 데이터를 로드
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // useMemo를 통해 불필요한 데이터 가공 최소화
  const articles = useMemo(
    () => data?.pages.flatMap((page) => page.list) ?? [],
    [data],
  );

  const handleSortChange = (sortType: ArticleOrder) => {
    setOrderBy(sortType);
  };

  return (
    <div className='max-w-desktop h-auto overflow-hidden mx-auto my-auto flex flex-col gap-32'>
      <div className='flex items-center justify-between'>
        <p className='text-lg font-medium tablet:text-xl tablet:font-bold text-text-primary'>
          게시글
        </p>
        <SortDropdown orderBy={orderBy} onSortChange={handleSortChange} />
      </div>

      <div className='flex flex-col gap-24 desktop:grid desktop:grid-cols-2'>
        {articles.map((board, index) => {
          if (articles.length === index + 1) {
            return (
              <div key={board.id} ref={lastArticleRef}>
                <ArticleCard board={board} onDeleteSuccess={refetch} />
              </div>
            );
          }
          return (
            <ArticleCard
              key={board.id}
              board={board}
              onDeleteSuccess={refetch}
            />
          );
        })}
      </div>

      {/* 검색 결과 없을 때 표시 */}
      {articles.length === 0 && !isLoading && !error && (
        <div className='mt-180  tablet:mt-158 text-text-default font-medium text-md tablet:text-lg flex justify-center'>
          검색 결과가 없습니다.
        </div>
      )}

      {(isFetchingNextPage || isLoading) && (
        <div className='flex justify-center items-center text-text-default font-medium text-md'>
          <div className='loader'>Loading...</div>
        </div>
      )}

      {error && (
        <div className='flex flex-col justify-center items-center text-text-default font-medium text-md '>
          <p>에러가 발생했습니다: {error.message}</p>
        </div>
      )}
    </div>
  );
}

export default ArticleList;
