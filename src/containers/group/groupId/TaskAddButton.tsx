import TaskCreateModal from '@/components/modal/TaskCreateModal';
import useModalStore from '@/stores/ModalStore';
import { useRouter } from 'next/router';

function TaskAddButton() {
  const { setModalOpen } = useModalStore();

  const router = useRouter();
  const { groupId } = router.query;

  return (
    <button
      type='button'
      onClick={() =>
        setModalOpen(<TaskCreateModal groupId={Number(groupId)} />)
      }
      className='text-brand-primary text-md font-normal'
    >
      + 새로운 목록 추가하기
    </button>
  );
}

export default TaskAddButton;
