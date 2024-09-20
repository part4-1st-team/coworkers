import DetailContent from '@/containers/board/detailBoard/detailContent/detailContent';
import CommentList from '@/containers/board/detailBoard/comment/commentList';
import { useRouter } from 'next/router';

function AticleDetailPage() {
  const router = useRouter();
  const { boardId } = router.query;

  // boardId가 string 타입일 경우 number로 변환
  const numerBoardId =
    typeof boardId === 'string' ? Number(boardId) : undefined;

  if (!numerBoardId) {
    return <div>Loading...</div>;
  }

  return (
    <div className='mt-32 h-auto tablet:mt-40 mx-16 tablet:mx-24 desktop:w-1200 desktop:mx-auto relative'>
      <DetailContent boardId={numerBoardId} />
      {/* CommentList에 articleId로 numerBoardId 전달 */}
      <CommentList articleId={numerBoardId} limit={10} />
    </div>
  );
}

export default AticleDetailPage;
