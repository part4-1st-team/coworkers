import DetailContent from '@/containers/board/detailBoard/detailContent/detailContent';
import CommentList from '@/containers/board/detailBoard/comment/commentList';

function BoardDetailPage() {
  return (
    <div className=' mt-32 h-auto tablet:mt-40 mx-16 tablet:mx-24 desktop:w-1200 desktop:mx-auto relative'>
      <DetailContent />
      <CommentList />
    </div>
  );
}
export default BoardDetailPage;
