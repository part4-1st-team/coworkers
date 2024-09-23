import { useQuery } from '@tanstack/react-query';
import { getArticleComment } from '@/services/ArticleCommentAPI';

// boardId 대신 teamId와 articleId를 받는 예시
function useArticleComment(articleId: number, limit: number, cursor?: number) {
  const {
    data, // 구조 분해 할당으로 'data' 추출
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['ArticleComments', articleId, limit, cursor],
    queryFn: () => getArticleComment(articleId, limit, cursor),
    enabled: !!articleId,
  });

  // API 응답에서 'list'와 'nextCursor'를 구조 분해 할당
  const articleComments = data?.list || [];
  const nextCursor = data?.nextCursor;

  return { articleComments, nextCursor, error, isLoading, refetch };
}

export default useArticleComment;
