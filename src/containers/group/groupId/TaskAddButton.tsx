import TaskCreateModal from '@/components/modal/TaskCreateModal';
import useQueryParameter from '@/hooks/useQueryParameter';
import useModalStore from '@/stores/ModalStore';

function TaskAddButton() {
  const { setModalOpen } = useModalStore();

  const { groupId } = useQueryParameter();

  return (
    <button
      type='button'
      onClick={() => setModalOpen(<TaskCreateModal groupId={groupId} />)}
      className='text-brand-primary text-md font-normal'
    >
      + 새로운 목록 추가하기
    </button>
  );
}

export default TaskAddButton;
