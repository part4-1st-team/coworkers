import { useMutation } from '@tanstack/react-query';
import BoardProfile from '@/components/profile/boardProfile';
import BoardDropdownMenu from '@/components/board/boardDropdown';
import EditInput from '@/components/input/editCommentInput';
import ArticleEdit from '@/hooks/useArticleEdit';
import {
  patchArticleComment,
  deleteArticleComment,
} from '@/services/ArticleCommentAPI';
import CurrentUser from '@/hooks/useCurrentUser';

interface CommentCardProps {
  comment: ArticleComment;
  onDeleteSuccess: () => void; // 삭제 성공 후 콜백 함수 (부모 컴포넌트에서 처리 가능)
}

function CommentCard({ comment, onDeleteSuccess }: CommentCardProps) {
  const { writer, createdAt, id } = comment;

  // 로그인한 사용자 정보 가져오기
  const { data: currentUser } = CurrentUser(); // 현재 로그인된 사용자 정보
  const isCommentAuthor = currentUser?.id === writer.id; // 로그인한 사용자가 댓글 작성자인지 확인

  // ArticleEdit 훅 사용
  const {
    isEditing,
    content,
    toggleEditMode,
    handleContentChange,
    setContent,
  } = ArticleEdit(comment.content);

  // 댓글 수정을 위한 useMutation 훅
  const {
    mutate: updateComment,
    isPending: isUpdating,
    isError: isUpdateError,
    error: updateError,
  } = useMutation({
    mutationFn: (newContent: string) => patchArticleComment(id, newContent),
    onSuccess: (updatedComment) => {
      // 수정된 댓글 내용으로 상태 업데이트
      setContent(updatedComment.content);
      toggleEditMode();
    },
    onError: (error) => {
      console.error('Failed to update the comment:', error);
    },
  });

  // 댓글 삭제를 위한 useMutation 훅
  const {
    mutate: removeComment,
    isPending: isDeleting,
    isError: isDeleteError,
    error: deleteError,
  } = useMutation({
    mutationFn: () => deleteArticleComment(id),
    onSuccess: () => {
      // 삭제 성공 후 처리: 부모 컴포넌트에 삭제 완료 알림
      onDeleteSuccess();
    },
    onError: (error) => {
      console.error('Failed to delete the comment:', error);
    },
  });

  // 수정 완료 함수
  const handleSave = () => {
    updateComment(content);
  };

  // 삭제 완료 함수
  const handleDelete = () => {
    removeComment();
  };

  return (
    <div className='pt-24 pb-24 px-32 bg-background-secondary rounded-12 border border-background-tertiary'>
      <div className='flex flex-col justify-between h-full'>
        {!isEditing && (
          <div className='mt-10 flex justify-between'>
            <p className='w-auto text-lg text-text-secondary font-medium'>
              {content}
            </p>
            {isCommentAuthor && ( // 댓글 작성자만 수정/삭제 드롭다운 표시
              <BoardDropdownMenu
                onEdit={toggleEditMode}
                onDelete={handleDelete}
              />
            )}
          </div>
        )}

        {isEditing && (
          <EditInput
            value={content}
            onChange={handleContentChange}
            onCancel={toggleEditMode}
            onSave={handleSave} // 수정 버튼 클릭 시 handleSave 호출
          />
        )}

        {/* 수정 중 로딩 상태 처리 */}
        {isUpdating && <p>수정 중입니다...</p>}

        {/* 수정 중 에러 발생 시 에러 메시지 처리 */}
        {isUpdateError && (
          <p>댓글 수정에 실패했습니다: {String(updateError)}</p>
        )}

        {/* 삭제 중 로딩 상태 처리 */}
        {isDeleting && <p>삭제 중입니다...</p>}

        {/* 삭제 중 에러 발생 시 에러 메시지 처리 */}
        {isDeleteError && (
          <p>댓글 삭제에 실패했습니다: {String(deleteError)}</p>
        )}

        {/* isEditing이 false일 때만 프로필 정보를 보여줌 */}
        {!isEditing && (
          <div className='mt-32 flex justify-between gap-16'>
            <div className='flex items-center gap-10'>
              <div className='w-32 h-32'>
                <BoardProfile
                  size={32}
                  nickname={writer.nickname}
                  image={writer.image}
                />
              </div>
              <p className='text-text-primary text-md font-medium'>
                {writer.nickname}
              </p>
              <div className='h-12 border border-background-tertiary' />
              <p className='text-md text-text-disabled'>
                {new Date(createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentCard;
