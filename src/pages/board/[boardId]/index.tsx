import DetailContent from '@/containers/board/detailBoard/detailContent/detailContent';
import CommentList from '@/containers/board/detailBoard/comment/commentList';
import { useRouter } from 'next/router';

function AticleDetailPage() {
  const router = useRouter();
  const { boardId } = router.query;

  return (
    <div className=' mt-32 h-auto tablet:mt-40 mx-16 tablet:mx-24 desktop:w-1200 desktop:mx-auto relative'>
      <DetailContent boardId={boardId} />
      <CommentList />
    </div>
  );
}
export default AticleDetailPage;
