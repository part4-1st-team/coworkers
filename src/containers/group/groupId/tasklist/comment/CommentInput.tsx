import ReplyInput from '@/components/input/replyInput';
import { postTaskComment } from '@/services/TaskCommentAPI';
import { useMutation } from '@tanstack/react-query';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface TaskCommentState {
  content: string;
}

function CommentInput() {
  const { control, handleSubmit } = useForm<TaskCommentState>();
  const taskId = 3; // TODO taskId 받아오기

  const postTaskCommentMutation = useMutation({
    mutationFn: (content: string) => postTaskComment(taskId, content),
    onSuccess: () => {},
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
