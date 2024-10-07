import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { getArticles } from '@/services/ArticleAPI';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import BestArticleCard from '@/containers/board/bestArticleList/bestArticleCard/bestArticleCard';

interface ArticleListProps {
  searchValue?: string;
}

function BestArticlePage({ searchValue }: ArticleListProps) {
  // "좋아요가 많은 순"으로 고정
  const orderBy = 'like';
  const pageSize = 4;

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery<Articles, Error>({
    queryKey: ['articles', orderBy, searchValue],
    queryFn: ({ pageParam = 1 }) =>
      getArticles(pageParam as number, pageSize, orderBy, searchValue),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.list.length < pageSize ? undefined : allPages.length + 1,
    initialPageParam: 1,
  });

  // 마지막 게시글 감지
  const { ref: lastArticleRef, inView } = useInView({ threshold: 0.1 });

  useInfiniteScroll({ inView, hasNextPage, isFetchingNextPage, fetchNextPage });

  // 스크롤 페이징 처리
  useInfiniteScroll({ inView, hasNextPage, isFetchingNextPage, fetchNextPage });

  // 데이터 플래튼
  const articles = data?.pages.flatMap((page) => page.list) ?? [];

  // 좋아요 순으로 정렬 (이미 API 호출 시 like 순으로 가져오므로 추가 정렬 불필요)
  const sortedArticles = articles;

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
    <main className='main-container relative min-w-375'>
      <div className='max-w-desktop h-auto overflow-hidden my-auto flex flex-col gap-32'>
        <div className='flex items-center justify-between'>
          <p className='text-lg font-medium tablet:text-xl tablet:font-bold text-text-primary dark:text-text-primary-dark'>
            베스트 게시글
          </p>
        </div>

        <div className='flex flex-col gap-24 desktop:grid desktop:grid-cols-2'>
          {sortedArticles.map((article, index) => {
            const isLastElement = index === sortedArticles.length - 1;
            return (
              <div key={article.id} ref={isLastElement ? lastArticleRef : null}>
                <BestArticleCard article={article} />
              </div>
            );
          })}
        </div>

        {sortedArticles.length === 0 && !isLoading && !error && (
          <div className='mt-180 tablet:mt-158 flex justify-center font-medium text-md tablet:text-lg text-text-default dark:text-text-default-dark'>
            검색 결과가 없습니다.
          </div>
        )}

        {isFetchingNextPage && (
          <div className='flex justify-center items-center font-medium text-md text-text-default dark:text-text-default-dark'>
            <div className='loader'>Loading...</div>
          </div>
        )}
      </div>
    </main>
  );
}

export default BestArticlePage;
