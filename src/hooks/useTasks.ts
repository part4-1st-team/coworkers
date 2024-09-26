import { getTasks } from '@/services/TaskAPI';
import getMonthDay from '@/utils/getMonthDay';
import { useQuery } from '@tanstack/react-query';

function useTasks(groupId: number, taskListId: number, date: string) {
  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery<DateTask[]>({
    queryKey: ['getTasks', groupId, taskListId, getMonthDay(date)],
    queryFn: () => getTasks(groupId, taskListId, date),
    enabled: !Number.isNaN(groupId) && !Number.isNaN(taskListId),
  });

  return { tasks: tasks ?? [], isLoading, error };
}

export default useTasks;
