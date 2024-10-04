import { postTaskPriority } from '@/services/TaskPriority.API';
import getMonthDay from '@/utils/getMonthDay';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type ParameterType = string | string[] | undefined;

function usePriorityMutation(
  groupId: ParameterType,
  taskListId: ParameterType,
  task: DateTask,
  pickDate: Date,
  userId: number,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      postTaskPriority(
        Number(groupId),
        Number(taskListId),
        task,
        getMonthDay(pickDate),
        userId,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          'getPriorityTasks',
          Number(groupId),
          Number(taskListId),
          getMonthDay(pickDate),
          userId,
        ],
      });
    },
  });
}

export default usePriorityMutation;
