import ReplyInput from '@/components/input/replyInput';
import { postTaskComment } from '@/services/TaskCommentAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface TaskCommentState {
  content: string;
}

function CommentInput({ taskId }: { taskId: number }) {
  const { control, handleSubmit, reset } = useForm<TaskCommentState>();

  const queryClient = useQueryClient();

  const postTaskCommentMutation = useMutation({
    mutationFn: (content: string) => postTaskComment(taskId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getTaskCommentList', taskId],
      });
      reset();
    },
    onError: () => {},
  });

  const handleSubmitComment: SubmitHandler<TaskCommentState> = (data) => {
    const { content } = data;

    postTaskCommentMutation.mutate(content);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitComment)}>
      <Controller
        name='content'
        control={control}
        render={({ field }) => <ReplyInput {...field} />}
      />
    </form>
  );
}

export default CommentInput;
