import { postTaskCommentReaction } from '@/services/Reactions.API';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function useTaskCommentReactionMutation(
  taskId: number,
  commentId: number,
  userId: number,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ type, data, action }: ReactionMutationProps) =>
      postTaskCommentReaction(taskId, commentId, userId, type, data, action),

    onMutate: async (variables) => {
      // type과 함께 데이터 저장
      return { type: variables.type };
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['taskCommentReaction', taskId, commentId, variables.type],
      });
    },
  });
}

export default useTaskCommentReactionMutation;
