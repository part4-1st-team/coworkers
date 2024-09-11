import { getTasks } from '@/services/TaskAPI';
import { useQuery } from '@tanstack/react-query';

function useTasks(groupId: number, taskListId: number, date?: string) {
  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery<DateTask[]>({
    queryKey: date
      ? ['getTasks', groupId, taskListId, date]
      : ['getTasks', groupId, taskListId],
    queryFn: () => getTasks(groupId, taskListId, date),
  });

  return { tasks: tasks ?? [], isLoading, error };
}

export default useTasks;
