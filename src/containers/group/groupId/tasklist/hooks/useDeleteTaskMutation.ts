import useToast from '@/components/toast/useToast';
import { deleteTask } from '@/services/TaskAPI';
import getMonthDay from '@/utils/getMonthDay';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function useDeleteTaskMutation(
  groupId: number,
  taskListId: number,
  taskId: number,
  date: string,
) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: () => deleteTask(Number(groupId), Number(taskListId), taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getTasks', groupId, taskListId, getMonthDay(date)],
      });

      toast('Success', '할 일을 성공적으로 삭제했습니다.');
    },
    onError: (error: any) =>
      toast('Error', error.response.message ?? '삭제에 실패했습니다'),
  });
}

export default useDeleteTaskMutation;
