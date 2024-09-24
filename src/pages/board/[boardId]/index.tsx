import DetailContent from '@/containers/board/detailBoard/detailContent/detailContent';
import CommentList from '@/containers/board/detailBoard/comment/commentList';
import { useRouter } from 'next/router';

function ArticleDetailPage() {
  // Aticle -> Article로 오타 수정
  const router = useRouter();
  const { boardId } = router.query;

  // boardId를 바로 number로 변환
  const numericBoardId = Number(boardId);

  if (!numericBoardId) {
    return <div>Loading...</div>;
  }

  return (
    <main className='main-container relative'>
      <DetailContent boardId={numericBoardId} />
      {/* CommentList에 articleId로 numericBoardId 전달 */}
      <CommentList articleId={numericBoardId} limit={10} />
    </main>
  );
}

export default ArticleDetailPage;
