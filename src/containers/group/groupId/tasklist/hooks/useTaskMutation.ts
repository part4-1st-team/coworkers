import { patchTask } from '@/services/TaskAPI';
import getMonthDay from '@/utils/getMonthDay';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';

const useTaskMutation = (
  task: DateTask,
  groupId: number,
  taskListId: number,
  setIsDone?: Dispatch<SetStateAction<boolean>>,
) => {
  const queryClient = useQueryClient();
  const { id, date } = task;

  return useMutation({
    mutationFn: (data: PatchTask) => patchTask(groupId, taskListId, id, data),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ['getTasks', groupId, taskListId, getMonthDay(date)],
      });
      const prevComments = queryClient.getQueryData([
        'getTasks',
        groupId,
        taskListId,
        getMonthDay(date),
      ]);
      return { prevComments };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['getTasks', groupId, taskListId, getMonthDay(date)],
      });

      if (setIsDone) {
        setIsDone(!!data.doneAt);
      }
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(
        ['getTasks', groupId, taskListId, getMonthDay(date)],
        context?.prevComments,
      );
    },
  });
};

export default useTaskMutation;
