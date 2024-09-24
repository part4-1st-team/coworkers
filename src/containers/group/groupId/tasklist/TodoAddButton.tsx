import { IconPlus } from '@/assets/IconList';
import TaskCreateDateModal from '@/components/modal/TaskCreateDateModal';
import useQueryParameter from '@/hooks/useQueryParameter';
import useModalStore from '@/stores/ModalStore';

function TodoAddButton() {
  const { setModalOpen } = useModalStore();
  const { groupId, taskListId } = useQueryParameter();

  return (
    <button
      type='button'
      onClick={() =>
        setModalOpen(
          <TaskCreateDateModal groupId={groupId} taskListId={taskListId} />,
        )
      }
      className='absolute right-24 bottom-24 tablet:bottom-25 desktop:right-0 desktop:bottom-49 bg-brand-primary flex gap-4 items-center px-21 py-14 rounded-40'
    >
      <IconPlus width={16} height={16} />
      <span className='text-white'>할 일 추가</span>
    </button>
  );
}

export default TodoAddButton;
