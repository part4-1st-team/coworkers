import Button from '@/components/button/button';
import useDeleteRecurringMutation from '@/containers/group/groupId/tasklist/hooks/useDeleteRecurringMutation';
import useDeleteTaskMutation from '@/containers/group/groupId/tasklist/hooks/useDeleteTaskMutation';
import useQueryParameter from '@/hooks/useQueryParameter';
import useModalStore from '@/stores/ModalStore';
import Modal from './Modal';

function TaskDeleteModal({ task }: { task: DateTask }) {
  const { setModalClose } = useModalStore();

  const { name, id: taskId, date, recurringId } = task;
  const { groupId, taskListId } = useQueryParameter();

  const deleteTaskMutation = useDeleteTaskMutation(
    groupId,
    taskListId,
    taskId,
    date,
  );

  const deleteRecurringMutation = useDeleteRecurringMutation(
    groupId,
    taskListId,
    taskId,
    recurringId,
    date,
  );

  return (
    <Modal.Alert>
      <div className='mt-16 mb-24 flex flex-col gap-8 items-center text-center'>
        <Modal.Title title={`'<b>${name}</b>' 일정을 삭제하시겠습니까?`} />
        <Modal.Description
          description={`삭제 시 선택한 날짜의 일정만 삭제되며,<br/>반복 삭제 시 반복 설정이 삭제됩니다.`}
        />
      </div>
      <Modal.Buttons>
        <Button
          type='button'
          onClick={() => {
            deleteTaskMutation.mutate();
            setModalClose();
          }}
          color='white'
          className='w-full'
        >
          삭제
        </Button>
        <Button
          type='button'
          onClick={() => {
            deleteRecurringMutation.mutate();
            setModalClose();
          }}
          color='red'
          className='w-full'
        >
          반복 일정 삭제
        </Button>
      </Modal.Buttons>
    </Modal.Alert>
  );
}

export default TaskDeleteModal;
