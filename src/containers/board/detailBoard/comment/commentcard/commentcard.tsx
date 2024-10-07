import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import ProfileImage from '@/components/member/ProfileImage';
import BoardDropdownMenu from '@/components/board/boardDropdown';
import EditInput from '@/components/input/editCommentInput';
import CommentEdit from '@/hooks/useCommentEdit';
import {
  patchArticleComment,
  deleteArticleComment,
} from '@/services/ArticleCommentAPI';
import useToast from '@/components/toast/useToast';
import ReportDropdownMenu from '@/components/board/ReportDropdownMenu';
import useUserStore from '@/stores/userStore';
import clsx from 'clsx';
import Button from '@/components/button/button';
import LikeIcon from './likeIcon';

interface CommentCardProps {
  comment: ArticleComment;
  onDeleteSuccess: () => void;
}

function CommentCard({ comment, onDeleteSuccess }: CommentCardProps) {
  const { writer, createdAt, id } = comment;

  // useUserStore 훅을 사용하여 로그인된 사용자 정보 가져오기
  const { user: currentUser, isLoggedIn } = useUserStore();
  const isCommentAuthor = currentUser?.id === writer.id;
  const { toast } = useToast();

  // 답글 입력창 상태 관리
  const [isReplying, setIsReplying] = useState(false);

  // 댓글 편집을 위한 CommentEdit 훅 사용
  const {
    isEditing,
    content,
    toggleEditMode,
    handleContentChange,
    setContent,
  } = CommentEdit('', comment.content);

  // 댓글 수정을 위한 useMutation 훅 리팩터링
  const updateCommentMutation = useMutation({
    mutationFn: (newContent: string) => patchArticleComment(id, newContent),
    onSuccess: (updatedComment) => {
      // 수정된 댓글 내용으로 상태 업데이트
      setContent(updatedComment.content);
      toggleEditMode();
      toast('Success', '댓글이 성공적으로 수정되었습니다.');
    },
    onError: () => {
      toast('Error', '댓글 수정이 실패했습니다.');
    },
  });

  // 댓글 삭제를 위한 useMutation 훅 리팩터링
  const removeCommentMutation = useMutation({
    mutationFn: () => deleteArticleComment(id),
    onSuccess: () => {
      toast('Success', '댓글이 성공적으로 삭제되었습니다.');
      onDeleteSuccess();
    },
    onError: () => {
      toast('Error', '댓글 삭제가 실패했습니다.');
    },
  });

  // 수정 완료 함수
  const handleSave = () => {
    updateCommentMutation.mutate(content); // 객체의 mutate 메서드 사용
  };

  // 삭제 완료 함수
  const handleDelete = () => {
    removeCommentMutation.mutate(); // 객체의 mutate 메서드 사용
  };

  // 답글 달기 버튼 클릭 시 호출될 함수
  const handleReplyClick = () => {
    setIsReplying((prev) => !prev);
  };

  // 답글 제출 로직 처리
  const handleReplySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // 로딩 상태 처리
  if (!isLoggedIn) {
    return (
      <p className='flex items-center text-text-primary dark:text-text-primary-dark font-medium text-md'>
        Loading...
      </p>
    );
  }

  // clsx를 사용하여 작성자인 경우와 아닌 경우의 border 색상 설정
  const commentCardClass = clsx(
    'p-12 tablet:py-20 tablet:px-24 rounded-12',
    'bg-background-secondary dark:bg-background-secondary-dark',
    'border border-background-tertiary dark:border-background-tertiary-dark shadow-md',
    isCommentAuthor ? ' shadow-lg' : '',
  );

  return (
    <div className={commentCardClass}>
      <div className='flex flex-col justify-between h-full'>
        {!isEditing && (
          <div className='mt-10 flex justify-between'>
            <p className='w-auto text-md tablet:text-lg text-text-secondary dark:text-text-secondary-dark font-medium'>
              {content}
            </p>

            {isCommentAuthor ? (
              <BoardDropdownMenu
                onEdit={toggleEditMode}
                onDelete={handleDelete}
              />
            ) : (
              <ReportDropdownMenu />
            )}
          </div>
        )}

        {isEditing && (
          <EditInput
            value={content}
            onChange={handleContentChange}
            onCancel={toggleEditMode}
            onSave={handleSave}
          />
        )}

        {/* isEditing이 false일 때만 프로필 정보를 보여줌 */}
        {!isEditing && (
          <div className='mt-15 flex justify-between gap-6 tablet:gap-16'>
            <div className='flex items-center gap-4 tablet:gap-10'>
              <div className='w-32 h-32'>
                <ProfileImage userImage={writer.image} size={32} />
              </div>
              <p className='text-text-primary dark:text-text-primary-dark text-xs tablet:text-md font-medium'>
                {writer.nickname}
              </p>
              <div className='h-12 border border-background-tertiary dark:border-background-tertiary-dark' />
              <p className='text-xs tablet:text-md text-text-disabled dark:text-text-disabled-dark flex items-center'>
                {new Date(createdAt).toLocaleDateString()}
              </p>
              <div className='ml-15 flex flex-row items-center gap-2 tablet:gap-10'>
                <LikeIcon icon='Like' />
                <div>
                  <LikeIcon icon='DisLike' />
                </div>
              </div>
            </div>

            {/* 답글 달기 버튼 추가 */}
            <button
              type='button'
              onClick={handleReplyClick}
              className='text-text-primary dark:text-text-primary-dark text-xs tablet:text-md font-medium'
            >
              답글 달기
            </button>
          </div>
        )}

        {/* 답글 입력창 표시 여부 */}
        {isReplying && (
          <form onSubmit={handleReplySubmit}>
            <div className='mt-20'>
              <textarea
                className='w-full h-30 text-md font-normal bg-background-tertiary dark:bg-background-tertiary-dark text-text-primary dark:text-text-primary-dark rounded-md p-2 resize-none  focus:outline-none'
                placeholder='답글을 작성하세요...'
              />
              <div className='mt-2 flex gap-10 items-center justify-end'>
                <Button
                  type='button'
                  size='md'
                  onClick={handleReplyClick}
                  className='text-text-default dark:text-text-default-dark font-semibold hover:text-text-tertiary  active:text-text-inverse'
                >
                  취소
                </Button>
                <Button
                  type='submit'
                  color='outline'
                  size='md'
                  className='w-74 h-32 px-1 py-6'
                >
                  답글 달기
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default CommentCard;
