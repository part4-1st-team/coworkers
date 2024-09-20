import DetailContent from '@/containers/board/detailBoard/detailContent/detailContent';
import CommentList from '@/containers/board/detailBoard/comment/commentList';
import { useRouter } from 'next/router';

function AticleDetailPage() {
  const router = useRouter();
  const { boardId } = router.query;

  const numerBoardId =
    typeof boardId === 'string' ? Number(boardId) : undefined;

  if (!numerBoardId) {
    return <div>Loading...</div>;
  }

  return (
    <div className='mt-32 h-auto tablet:mt-40 mx-16 tablet:mx-24 desktop:w-1200 desktop:mx-auto relative'>
      <DetailContent boardId={numerBoardId} />
      <CommentList />
    </div>
  );
}
export default AticleDetailPage;
