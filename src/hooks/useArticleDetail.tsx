import { useQuery } from '@tanstack/react-query';
import { getArticleDetail } from '@/services/ArticleAPI';

/**
 * 게시글 상세 정보를 가져오는 훅
 * @param boardId - 게시글 ID
 * @returns 게시글 상세 정보 및 상태
 */
const useArticleDetail = (boardId: number | undefined) => {
  const {
    data: articleDetail,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['articleDetail', boardId],
    queryFn: () => {
      if (!boardId || typeof boardId === 'object') {
        throw new Error('게시글 ID가 유효하지 않습니다.');
      }
      return getArticleDetail(boardId);
    },
    enabled: !!boardId && typeof boardId === 'number',
    retry: false,
  });

  return {
    articleDetail,
    error,
    isFetching,
    refetch,
  };
};

export default useArticleDetail;
