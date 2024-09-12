import { getTasks } from '@/services/TaskAPI';
import getMonthDay from '@/utils/getMonthDay';
import { useQuery } from '@tanstack/react-query';

function useTasks(groupId: number, taskListId: number, date?: string) {
  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery<DateTask[]>({
    queryKey: date
      ? ['getTasks', groupId, taskListId, getMonthDay(date)]
      : ['getTasks', groupId, taskListId],
    queryFn: () => getTasks(groupId, taskListId, date),
  });

  return { tasks: tasks ?? [], isLoading, error };
}

export default useTasks;
