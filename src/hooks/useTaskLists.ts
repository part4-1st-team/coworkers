import { getTaskLists } from '@/services/TaskListAPI';
import { useQuery } from '@tanstack/react-query';

function useTaskLists(groupId: number, date?: string) {
  const {
    data: taskLists,
    isLoading,
    error,
  } = useQuery<TaskList[]>({
    queryKey: date
      ? ['getTaskLists', groupId, date]
      : ['getTaskLists', groupId],
    queryFn: () => getTaskLists(groupId, date).then((data) => data.taskLists),
  });

  return { taskLists: taskLists ?? [], isLoading, error };
}

export default useTaskLists;
