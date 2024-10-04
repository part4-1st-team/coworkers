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
    mutationFn: ({
      isPatch = false,
      done = false,
    }: {
      isPatch?: boolean;
      done?: boolean;
    }) =>
      postTaskPriority(
        Number(groupId),
        Number(taskListId),
        task,
        getMonthDay(pickDate),
        userId,
        isPatch ? 'patch' : undefined,
        done,
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
