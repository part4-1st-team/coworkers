import { getTaskLists } from '@/services/TaskListAPI';
import { useQuery } from '@tanstack/react-query';

function useTaskLists(groupId: number) {
  const {
    data: taskLists,
    isLoading,
    error,
  } = useQuery<TaskList[]>({
    queryKey: ['getTaskLists', groupId],
    queryFn: () => getTaskLists(groupId).then((data) => data.taskLists),
    enabled: !Number.isNaN(groupId),
  });

  return { taskLists: taskLists ?? [], isLoading, error };
}

export default useTaskLists;
