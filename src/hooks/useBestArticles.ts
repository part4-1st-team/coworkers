import { useQuery } from '@tanstack/react-query';
import { getArticles } from '@/services/ArticleAPI';

// 커스텀 훅 정의
function useBestArticles(pageSize: number) {
  return useQuery({
    queryKey: ['bestArticles', pageSize],
    queryFn: () => getArticles(1, pageSize, 'like'),
  });
}

export default useBestArticles;
