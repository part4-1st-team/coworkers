import { getTaskLists } from '@/services/TaskListAPI';
import { useQuery } from '@tanstack/react-query';

function useTaskLists(groupId: number, taskListId: number, date?: string) {
  const {
    data: TaskLists,
    isLoading,
    error,
  } = useQuery<Task[]>({
    queryKey: ['getTaskLists', groupId, taskListId, date],
    queryFn: () =>
      getTaskLists(groupId, taskListId, date).then((data) => data.tasks),
  });

  return { TaskLists, isLoading, error };
}

export default useTaskLists;
