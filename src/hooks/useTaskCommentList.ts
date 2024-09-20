import { getTaskComments } from '@/services/TaskCommentAPI';
import { useQuery } from '@tanstack/react-query';

function useTaskCommentList(taskId: number) {
  const {
    data: taskCommentList,
    error,
    isLoading,
  } = useQuery<Comment[]>({
    queryKey: ['getTaskCommentList', taskId],
    queryFn: () => getTaskComments(taskId),
  });

  return { taskCommentList: taskCommentList ?? [], error, isLoading };
}

export default useTaskCommentList;
