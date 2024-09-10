import Button from '@/components/button/button';
import { deleteTaskComment, patchTaskComment } from '@/services/TaskCommentAPI';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import KebabDropdown from './KebabDropdown';

function Comment() {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const taskId = 5;
  const commentId = 6;

  const handleEditing = () => {
    setIsEditing(true);
  };

  const patchTaskCommentMutation = useMutation({
    mutationFn: (content: string) =>
      patchTaskComment(taskId, commentId, content),
    onSuccess: () => {},
    onError: () => {},
  });

  const deleteTaskCommentMutation = useMutation({
    mutationFn: () => deleteTaskComment(taskId, commentId),
    onSuccess: () => {},
    onError: () => {},
  });

  const handlePatchTaskComment: SubmitHandler<CommentState> = (data) => {
    const { content } = data;
    patchTaskCommentMutation.mutate(content);
  };

  const { handleSubmit, control, register } = useForm<CommentState>({
    mode: 'onSubmit',
    defaultValues: {
      content: '혹시 관련해서 미팅 오늘 중으로 가능하신가요?',
    },
  });

  if (isEditing)
    return (
      <div className='w-full pb-16 border-b border-background-tertiary border-opacity-10'>
        <form
          className='flex flex-col gap-8'
          onSubmit={handleSubmit(handlePatchTaskComment)}
        >
          <textarea
            className='bg-background-secondary w-full h-fit resize-none text-md font-normal text-text-primary outline-none'
            placeholder='댓글을 입력해주세요'
            {...register('content')}
          />

          <div className='flex justify-end'>
            <div className='flex gap-8 items-center'>
              <button
                type='button'
                onClick={() => setIsEditing(false)}
                className='text-text-default text-md font-semibold w-48 h-32'
              >
                취소
              </button>
              <Button type='submit' color='outline' className='w-74 h-32'>
                수정하기
              </Button>
            </div>
          </div>
        </form>
      </div>
    );

  return (
    <div className='w-full flex flex-col gap-16 border-b border-background-tertiary pb-16 border-opacity-10'>
      <div className='flex justify-between items-center'>
        <span className='text-md font-normal text-text-primary'>
          혹시 관련해서 미팅 오늘 중으로 가능하신가요?
        </span>
        <KebabDropdown
          handleEdit={handleEditing}
          handleDelete={deleteTaskCommentMutation.mutate}
        />
      </div>
      <div className='flex justify-between items-center'>
        <div className='flex gap-12 items-center'>
          <div className='w-32 h-32 rounded-[9999px] bg-white' />
          <span className='text-md font-medium text-text-primary'>안해나</span>
        </div>
        <span className='text-md font-normal text-text-secondary'>
          2024년 5월 26일
        </span>
      </div>
    </div>
  );
}
export default Comment;
