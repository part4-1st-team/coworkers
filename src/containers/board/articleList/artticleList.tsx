import { useState, useCallback, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getArticles } from '@/services/ArticleAPI';
import { Articles } from '@/types/Article';
import Dropdown from '@/components/dropdown/Dropdown';
import useDropdown from '@/hooks/useDropdown';
import { IconToggleDown } from '@/assets/IconList';
import ArticleCard from './articleListCard/articleListCard';

type ArticleOrder = 'like' | 'recent';

function ArticleList() {
  const [orderBy, setOrderBy] = useState<ArticleOrder>('recent');
  const pageSize = 4;
  const { isOpen, handleToggleDropdown, handleOffDropdown } = useDropdown();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery<Articles, Error>({
    queryKey: ['articles', orderBy],
    queryFn: ({ pageParam = 1 }) => {
      const page = typeof pageParam === 'number' ? pageParam : undefined;
      return getArticles(page, pageSize, orderBy);
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

  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastArticleRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetchingNextPage) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage],
  );

  const articles = data?.pages.flatMap((page) => page.list) ?? [];

  const handleSortChange = (sortType: ArticleOrder) => {
    setOrderBy(sortType);
    handleOffDropdown();
  };

  return (
    <div className='max-w-desktop h-auto overflow-hidden mx-auto my-auto flex flex-col gap-32'>
      <div className='flex items-center justify-between'>
        <p className='text-lg font-medium tablet:text-xl tablet:font-bold text-text-primary'>
          게시글
        </p>
        <Dropdown onClose={handleOffDropdown}>
          <Dropdown.Trigger onClick={handleToggleDropdown}>
            <div className='bg-background-secondary text-text-primary font-normal w-130 h-44 px-14 py-10 rounded-12 flex items-center justify-between text-sm tablet:text-md '>
              {orderBy === 'like' ? '좋아요 많은순' : '최신순'}
              <IconToggleDown className='text-icon-primary' />
            </div>
          </Dropdown.Trigger>
          <Dropdown.Menu isOpen={isOpen} className='w-130 absolute top-44'>
            <Dropdown.List
              onClick={() => handleSortChange('like')}
              onClose={handleOffDropdown}
            >
              좋아요 많은순
            </Dropdown.List>
            <Dropdown.List
              onClick={() => handleSortChange('recent')}
              onClose={handleOffDropdown}
            >
              최신순
            </Dropdown.List>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className='flex flex-col gap-24 desktop:grid desktop:grid-cols-2'>
        {articles.map((board, index) => {
          if (articles.length === index + 1) {
            return (
              <div key={board.id} ref={lastArticleRef}>
                <ArticleCard board={board} />
              </div>
            );
          }
          return <ArticleCard key={board.id} board={board} />;
        })}
      </div>

      {(isFetchingNextPage || isLoading) && <div>Loading...</div>}
      {error && <div>에러가 발생했습니다: {error.message}</div>}
    </div>
  );
}

export default ArticleList;
