import { useQuery } from '@tanstack/react-query';
import { getArticles } from '@/services/ArticleAPI';

// 커스텀 훅 정의
function useBestArticles(pageSize: number) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['bestArticles', pageSize],
    queryFn: () => getArticles(1, pageSize, 'like'),
  });

  // 필요한 값만 리턴
  return {
    bestArticles: data,
    isLoading,
    isError,
  };
}

export default useBestArticles;
