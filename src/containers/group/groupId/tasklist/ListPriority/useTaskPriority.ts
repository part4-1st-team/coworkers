import { getTaskPriority } from '@/services/TaskPriority.API';
import getMonthDay from '@/utils/getMonthDay';
import { useQuery } from '@tanstack/react-query';

function useTaskPriority(groupId: number, taskListId: number, date: string) {
  const { data, isLoading, refetch, isError, error } = useQuery({
    queryKey: ['getPriorityTasks', groupId, taskListId, date],
    queryFn: () => getTaskPriority(groupId, taskListId, date),
    enabled: !Number.isNaN(groupId) && !Number.isNaN(taskListId),
  });

  return {
    priorityTasks: data?.priorityTasks,
    priorityTasksSize: data?.size,
    isLoading,
    refetch,
    isError,
    error,
  };
}

export default useTaskPriority;
