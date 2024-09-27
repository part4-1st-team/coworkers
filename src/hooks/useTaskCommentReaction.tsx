import { getReaction } from '@/services/Reactions.API';
import { useQuery } from '@tanstack/react-query';

function useTaskCommentReaction(
  taskId: number,
  commentId: number,
  type: ReactionType,
) {
  const {
    data: commentReaction,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['taskCommentReaction', taskId, commentId, type],
    queryFn: () => getReaction(taskId, commentId, type),
  });

  return {
    reactionUserList: commentReaction?.reactionUserList,
    reactionCount: commentReaction?.size,
    isLoading,
    error,
  };
}

export default useTaskCommentReaction;
