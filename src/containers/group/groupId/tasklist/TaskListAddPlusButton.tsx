import { IconPlus } from '@/assets/IconList';
import TaskCreateModal from '@/components/modal/TaskCreateModal';
import useQueryParameter from '@/hooks/useQueryParameter';
import useModalStore from '@/stores/ModalStore';
import clsx from 'clsx';
import { useState } from 'react';

function TaskListAddPlusButton() {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const { setModalOpen } = useModalStore();

  const { groupId } = useQueryParameter();

  return (
    <div className='relative flex items-center justify-center'>
      <button
        type='button'
        onClick={() => setModalOpen(<TaskCreateModal groupId={groupId} />)}
        className='shadow-md bg-brand-primary hover:bg-interaction-hover text-white size-60 tablet:size-80 rounded-12 flex items-center justify-center'
        onMouseEnter={() => setShowTooltip(true)} // 마우스가 버튼에 올라갔을 때
        onMouseLeave={() => setShowTooltip(false)} // 마우스가 버튼을 떠났을 때
        aria-label='새로운 목록 추가 버튼'
      >
        <IconPlus width={32} height={32} />
      </button>
      {showTooltip && (
        <p
          className={clsx(
            'absolute top-[-45px] left-0 w-fit whitespace-nowrap text-md font-medium p-10 rounded-12 shadow-md border border-border-primary dark:border-border-primary-dark',
            'bg-background-tertiary dark:bg-background-tertiary-dark text-text-secondary dark:text-text-secondary-dark',
          )}
        >
          새로운 목록을 추가하시겠습니까?
        </p>
      )}
    </div>
  );
}

export default TaskListAddPlusButton;
