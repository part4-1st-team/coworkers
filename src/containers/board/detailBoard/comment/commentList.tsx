import useArticleComment from '@/hooks/useArticleComment'; // 댓글 데이터를 가져오는 훅
import CommentCard from './commentcard/commentcard';

interface CommentListProps {
  articleId: number;
  limit: number;
  cursor?: number;
}

function CommentList({ articleId, limit, cursor }: CommentListProps) {
  // 댓글 데이터를 불러오는 커스텀 훅 호출
  const { articleComments, isLoading, error, refetch } = useArticleComment(
    articleId,
    limit,
    cursor,
  );

  // 댓글 불러오기 중이면 로딩 메시지 표시
  if (isLoading) {
    return <div>Loading comments...</div>;
    // TODO 애니메이션추가 여부
  }

  // 댓글 불러오기 에러 처리
  if (error) {
    return <div>Error loading comments: {error.message}</div>;
  }

  // 삭제 성공 후 댓글 목록 갱신 함수
  const handleDeleteSuccess = () => {
    refetch();
  };

  return (
    <div className='mt-40 flex flex-col gap-16'>
      {articleComments.length > 0 ? (
        articleComments.map((comment: ArticleComment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            onDeleteSuccess={handleDeleteSuccess}
          />
        ))
      ) : (
        <div className='mt-180  tablet:mt-158 text-text-default font-medium text-md tablet:text-lg flex justify-center'>
          아직 작성된 댓글이 없습니다.
        </div>
      )}
    </div>
  );
}

export default CommentList;
