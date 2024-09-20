import useArticleComment from '@/hooks/useArticleComment';
import CommentCard from './commentcard/commentcard';

interface CommentListProps {
  articleId: number;
  limit: number; // limit과 cursor를 props로 받을 수 있음
  cursor?: number; // 선택적 cursor
}

function CommentList({ articleId, limit, cursor }: CommentListProps) {
  // 댓글 데이터를 불러오는 커스텀 훅 호출
  const { articleComments, isLoading, error } = useArticleComment(
    articleId,
    limit,
    cursor,
  );

  if (isLoading) {
    return <div>Loading comments...</div>;
  }

  if (error) {
    return <div>Error loading comments: {error.message}</div>;
  }

  return (
    <div className='mt-40 flex flex-col gap-16'>
      {articleComments.length > 0 ? (
        articleComments.map((comment: ArticleComment) => (
          <CommentCard key={comment.id} comment={comment} /> // 각 댓글을 CommentCard로 렌더링
        ))
      ) : (
        <div>댓글이 없습니다.</div>
      )}
    </div>
  );
}

export default CommentList;
