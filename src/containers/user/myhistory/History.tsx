import { IconCheckboxActive, IconKebabSmall } from '@/assets/IconList';
import HistoryModal from '@/components/modal/HistoryModal';
import useModalStore from '@/stores/ModalStore';

function History({ task }: { task: DoneTask }) {
  const { setModalOpen } = useModalStore();

  const { name } = task;
  return (
    <div className='shadow-history w-full flex justify-between items-center bg-background-tertiary dark:bg-background-tertiary-dark py-10 px-14 rounded-8'>
      <div className='flex gap-7 items-center'>
        <IconCheckboxActive />
        <span className='text-text-primary dark:text-text-primary-dark text-md font-normal line-through'>
          {name}
        </span>
      </div>
      <button
        type='button'
        onClick={() => setModalOpen(<HistoryModal history={task} />)}
        aria-label='히스토리 정보 보기'
      >
        <IconKebabSmall />
      </button>
    </div>
  );
}

export default History;
