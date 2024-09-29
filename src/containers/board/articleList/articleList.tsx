import { useState, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { getArticles } from '@/services/ArticleAPI';
import SortDropdown from '@/components/board/sortDropdown';
import ArticleCard from './articleListCard/articleListCard';

type ArticleOrder = 'like' | 'recent';

interface ArticleListProps {
  searchValue?: string;
}

interface UseInfiniteScrollProps {
  inView: boolean;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

function useInfiniteScroll({
  inView,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: UseInfiniteScrollProps) {
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
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
    queryFn: ({ pageParam = 1 }) =>
      getArticles(pageParam as number, pageSize, orderBy, searchValue),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.list.length < pageSize ? undefined : allPages.length + 1,
    initialPageParam: 1,
    staleTime: 1000 * 60 * 1,
  });

  // 마지막 게시글 감지
  const { ref: lastArticleRef, inView } = useInView({ threshold: 0.1 });

  // 스크롤 페이징 처리
  useInfiniteScroll({ inView, hasNextPage, isFetchingNextPage, fetchNextPage });

  // 데이터 플래튼
  const articles = data?.pages.flatMap((page) => page.list) ?? [];

  const handleSortChange = (sortType: ArticleOrder) => setOrderBy(sortType);

  if (isLoading) {
    return <div className='loader'>Loading...</div>;
  }

  if (error) {
    return (
      <div className='flex flex-col justify-center items-center text-text-primary dark:text-text-primary-dark font-medium text-md'>
        <p>에러가 발생했습니다: {error.message}</p>
      </div>
    );
  }

  return (
    <div className='max-w-desktop h-auto overflow-hidden my-auto flex flex-col gap-32'>
      <div className='flex items-center justify-between'>
        <p className='text-lg font-medium tablet:text-xl tablet:font-bold text-text-primary dark:text-text-primary-dark'>
          게시글
        </p>
        <SortDropdown orderBy={orderBy} onSortChange={handleSortChange} />
      </div>

      <div className='flex flex-col gap-24 desktop:grid desktop:grid-cols-2'>
        {articles.map((article, index) => {
          const isLastElement = index === articles.length - 1;
          return (
            <div key={article.id} ref={isLastElement ? lastArticleRef : null}>
              <ArticleCard article={article} onDeleteSuccess={refetch} />
            </div>
          );
        })}
      </div>

      {articles.length === 0 && !isLoading && !error && (
        <div className='mt-180 tablet:mt-158 text-text-default dark:text-text-default-dark font-medium text-md tablet:text-lg flex justify-center'>
          검색 결과가 없습니다.
        </div>
      )}

      {isFetchingNextPage && (
        <div className='flex justify-center items-center text-text-default dark:text-text-default-dark font-medium text-md'>
          <div className='loader'>Loading...</div>
        </div>
      )}
    </div>
  );
}

export default ArticleList;
