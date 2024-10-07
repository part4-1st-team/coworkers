import { useEffect } from 'react';

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

export default useInfiniteScroll;
