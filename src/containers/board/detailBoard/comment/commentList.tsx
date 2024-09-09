import CommentCard from './commentcard/commentcard';

function CommentList() {
  return (
    <div className='mt-40 flex flex-col gap-16'>
      <CommentCard />
      <CommentCard />
      <CommentCard />
    </div>
  );
}

export default CommentList;
