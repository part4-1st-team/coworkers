import useQueryParameter from '@/hooks/useQueryParameter';
import { deleteTaskList } from '@/services/TaskListAPI';
import useModalStore from '@/stores/ModalStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '@/components/button/button';
import useToast from '@/components/toast/useToast';
import Modal from './Modal';

function TaskListDeleteModal({ taskListId }: { taskListId: number }) {
  const { setModalClose } = useModalStore();
  const { groupId } = useQueryParameter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const taskListDeleteMutation = useMutation({
    mutationFn: () => deleteTaskList(groupId, taskListId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getTaskLists', groupId],
      });
      toast('Success', '목록이 성공적으로 삭제되었습니다.');
      setModalClose();
    },
    onError: () => {
      toast('Error', '목록을 삭제하는데 실패했습니다.');
    },
  });

  const handleTaskListDelete = () => {
    taskListDeleteMutation.mutate();
  };

  return (
    <Modal.Alert>
      <div className='mt-16 mb-24 flex flex-col gap-8 items-center text-center'>
        <Modal.Title title='목록을 삭제하시겠습니까?' />
        <Modal.Description description='해당 목록이 삭제되며,<br/>목록에 있는 할 일들이 전부 삭제됩니다.' />
      </div>
      <Modal.Buttons>
        <Button
          type='button'
          onClick={setModalClose}
          color='white'
          className='w-full'
        >
          닫기
        </Button>
        <Button
          type='button'
          onClick={handleTaskListDelete}
          color='red'
          className='w-full'
        >
          목록 삭제
        </Button>
      </Modal.Buttons>
    </Modal.Alert>
  );
}

export default TaskListDeleteModal;
