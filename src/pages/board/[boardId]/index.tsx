import DetailContent from '@/containers/board/detailBoard/detailContent/detailContent';
import CommentList from '@/containers/board/detailBoard/comment/commnetList/commentList';
import AddComment from '@/containers/board/detailBoard/addComment/addComment';
import { useRouter } from 'next/router';
import useToast from '@/components/toast/useToast';
import { postArticleViewCount } from '@/services/ArticleViewCount.API';
import { useEffect } from 'react';

function ArticleDetailPage() {
  const router = useRouter();
  const { boardId } = router.query;
  const { toast } = useToast();

  // boardId를 바로 number로 변환
  const numberBoardId = Number(boardId);

  // 페이지가 로드될 때 조회수를 증가시킴 (새로고침 시 카운트 방지)
  useEffect(() => {
    if (numberBoardId) {
      // localStorage에서 현재 게시글(boardId)의 방문 기록 확인
      const visitedArticles = JSON.parse(
        localStorage.getItem('visitedArticles') || '{}',
      );

      // 해당 게시글을 처음 방문한 경우만 조회수 증가
      if (!visitedArticles[numberBoardId]) {
        postArticleViewCount(numberBoardId, toast);

        // 방문 기록을 localStorage에 저장
        visitedArticles[numberBoardId] = true;
        localStorage.setItem(
          'visitedArticles',
          JSON.stringify(visitedArticles),
        );
      }
    }
  }, [numberBoardId, toast]);

  return (
    <main className='main-container relative mt-116 min-w-375'>
      <DetailContent boardId={numberBoardId} />
      <AddComment boardId={numberBoardId} />
      <CommentList articleId={numberBoardId} limit={10} />
    </main>
  );
}

export default ArticleDetailPage;
