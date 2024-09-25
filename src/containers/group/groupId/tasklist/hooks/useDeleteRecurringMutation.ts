import useToast from '@/components/toast/useToast';
import { deleteTaskRecurring } from '@/services/TaskAPI';

import getMonthDay from '@/utils/getMonthDay';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function useDeleteRecurringMutation(
  groupId: number,
  taskListId: number,
  taskId: number,
  recurringId: number,
  date: string,
) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: () =>
      deleteTaskRecurring(groupId, taskListId, taskId, recurringId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getTasks', groupId, taskListId, getMonthDay(date)],
      });

      toast('Success', '반복 설정을 성공적으로 삭제했습니다.');
    },
    onError: (error: any) =>
      toast('Error', error.response.message ?? '삭제에 실패했습니다'),
  });
}

export default useDeleteRecurringMutation;
