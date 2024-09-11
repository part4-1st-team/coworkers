import { getTasks } from '@/services/TaskAPI';
import { useQuery } from '@tanstack/react-query';

function useTasks(groupId: number, taskListId: number, date?: string) {
  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery<DateTask[]>({
    queryKey: ['getTasks', groupId, taskListId, date],
    queryFn: () => getTasks(groupId, taskListId, date),
  });

  return { tasks, isLoading, error };
}

export default useTasks;
