import { IconPlus } from '@/assets/IconList';
import TaskCreateDateModal from '@/components/modal/TaskCreateDateModal';
import useModalStore from '@/stores/ModalStore';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';

function TodoAddButton() {
  const { setModalOpen } = useModalStore();

  const router = useRouter();
  const { groupId, taskListId } = router.query;

  return (
    <button
      type='button'
      onClick={() =>
        setModalOpen(
          <TaskCreateDateModal
            groupId={Number(groupId)}
            taskListId={Number(taskListId)}
          />,
        )
      }
      className='shadow-md absolute right-24 bottom-24 tablet:bottom-25 desktop:right-20 desktop:bottom-30 bg-brand-primary flex gap-4 items-center px-21 py-14 rounded-40'
    >
      <IconPlus width={16} height={16} />
      <span className='text-white'>할 일 추가</span>
    </button>
  );
}

export default TodoAddButton;
