import clsx from 'clsx';
import { useState } from 'react';

import {
  IconCalendar,
  IconCheckboxActive,
  IconCheckboxDefault,
  IconComment,
  IconKebabSmall,
  IconRepeat,
} from '@/assets/IconList';

import getDaily from '@/utils/getDaily';
import getDate from '@/utils/getDate';

import useHalfPageStore from '@/stores/HalfPageStore';

import useQueryParameter from '@/hooks/useQueryParameter';
import EditDeleteDropdown from '../EditDeleteDropdown';
import HalfPageContent from './HalfPage/HalfListContent';
import useDeleteTaskMutation from './hooks/useDeleteTaskMutation';
import useTaskMutation from './hooks/useTaskMutation';

function Task({ task }: { task: DateTask }) {
  const {
    id: taskId,
    name,
    commentCount,
    // updatedAt,
    frequency,
    doneAt,
    date,
  } = task;

  // 완료했는지 체크할 상태 (이걸로 먼저 화면 업데이트)
  const [isDone, setIsDone] = useState<boolean>(!!doneAt);

  const { setHalfPageOpen } = useHalfPageStore();

  const { groupId, taskListId } = useQueryParameter();

  const doneTaskMutation = useTaskMutation(
    task,
    groupId,
    taskListId,
    setIsDone,
  );

  const deleteTaskMutation = useDeleteTaskMutation(
    groupId,
    taskListId,
    taskId,
    date,
  );
  const handleDoneTask = (e: any) => {
    e.stopPropagation();

    // 완료된 상태면
    if (isDone) {
      doneTaskMutation.mutate({ done: false });
    } else {
      doneTaskMutation.mutate({ done: true });
    }
  };

  return (
    /* eslint-disable jsx-a11y/click-events-have-key-events */

    <div
      role='button'
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setHalfPageOpen(<HalfPageContent task={task} />);
        }
      }}
      onClick={() => setHalfPageOpen(<HalfPageContent task={task} />)}
      className='cursor-pointer bg-background-secondary flex flex-col gap-10 rounded-8 py-12 px-14'
    >
      <div className='flex justify-between w-full items-center'>
        <div className='flex gap-12'>
          <div className='flex gap-8 items-center'>
            <button type='button' onClick={handleDoneTask}>
              {isDone ? <IconCheckboxActive /> : <IconCheckboxDefault />}
            </button>

            <span
              className={clsx(
                'text-text-primary text-md font-normal',
                isDone && 'line-through',
              )}
            >
              {name}
            </span>
          </div>

          <div className='flex gap-2 items-center'>
            <IconComment />

            <span className='text-xs font-normal text-text-default'>
              {commentCount}
            </span>
          </div>
        </div>

        <EditDeleteDropdown
          trigger={<IconKebabSmall />}
          handleEdit={() => console.log('수정')}
          handleDelete={() => deleteTaskMutation.mutate()}
        />
      </div>

      <div className='flex items-center gap-10'>
        <div className='flex gap-6 items-center'>
          <IconCalendar width={16} height={16} />

          <span className='text-xs font-normal text-text-default'>
            {getDate(date)}
          </span>
        </div>

        <div className='w-1 h-8 rounded bg-background-tertiary' />

        <div className='flex gap-6 items-center'>
          <IconRepeat />

          <span className='text-xs font-normal text-text-default'>
            {getDaily(frequency)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Task;
