import clsx from 'clsx';
import { useState } from 'react';

import {
  IconCalendar,
  IconComment,
  IconKebabSmall,
  IconRepeat,
} from '@/assets/IconList';

import getDaily from '@/utils/getDaily';
import getDate from '@/utils/getDate';

import useHalfPageStore from '@/stores/HalfPageStore';

import Checkbox from '@/components/checkbox/Checkbox';
import useQueryParameter from '@/hooks/useQueryParameter';
import EditDeleteDropdown from '../EditDeleteDropdown';
import HalfPageContent from './HalfPage/HalfListContent';
import useDeleteTaskMutation from './hooks/useDeleteTaskMutation';
import TaskDoneHandler from './TaskDoneHandler';

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

  const deleteTaskMutation = useDeleteTaskMutation(
    groupId,
    taskListId,
    taskId,
    date,
  );

  const handleDoneTask = TaskDoneHandler(task, isDone, setIsDone);

  return (
    /* eslint-disable jsx-a11y/click-events-have-key-events */
    <div
      role='button'
      tabIndex={0}
      onClick={() =>
        setHalfPageOpen(<HalfPageContent task={task} isDone={isDone} />)
      }
      className='cursor-pointer bg-background-secondary flex flex-col gap-10 rounded-8 py-12 px-14'
    >
      <div className='flex justify-between w-full items-center'>
        <div className='flex gap-12'>
          <div className='flex gap-8 items-center'>
            <Checkbox checked={isDone} handleClick={handleDoneTask} />
            <div className='relative'>
              {isDone && (
                <span className='absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-text-primary animate-line-through w-full'></span>
              )}
              <span className={clsx('text-text-primary text-md font-normal')}>
                {name}
              </span>
            </div>
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
