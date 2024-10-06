import clsx from 'clsx';
import { useEffect, useState } from 'react';

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
import TaskDeleteModal from '@/components/modal/TaskDeleteModal';
import TaskEditModal from '@/components/modal/TaskEditModal';
import useModalStore from '@/stores/ModalStore';
import getMonthDay from '@/utils/getMonthDay';
import { Draggable } from 'react-beautiful-dnd';
import { useMediaQuery } from 'react-responsive';
import EditDeleteDropdown from '../../EditDeleteDropdown';
import HalfPageContent from '../HalfPage/HalfListContent';
import TaskDoneHandler from '../TaskDoneHandler';
import PriorityButton from './PriorityButton';
import useUserStore from '@/stores/userStore';

function Task({
  task,
  index,
  isPriority,
}: {
  task: DateTask;
  index: number;
  isPriority?: boolean;
}) {
  const {
    id: taskId,
    name,
    commentCount,
    frequency,
    doneAt,
    date,
    writer,
  } = task;

  // 완료했는지 체크할 상태 (이걸로 먼저 화면 업데이트)
  const [isDone, setIsDone] = useState<boolean>(!!doneAt);
  const [mounted, setMounted] = useState<boolean>(false);

  const { setHalfPageOpen } = useHalfPageStore();

  const handleDoneTask = TaskDoneHandler(task, isDone, setIsDone);

  const { user: currentUser } = useUserStore();

  const { setModalOpen } = useModalStore();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  if (!mounted) return null;
  if (!currentUser) return null;

  return (
    /* eslint-disable jsx-a11y/click-events-have-key-events */
    <Draggable draggableId={String(taskId)} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          role='button'
          tabIndex={0}
          onClick={() =>
            setHalfPageOpen(
              <HalfPageContent
                setIsDone={setIsDone}
                task={task}
                isDone={isDone}
              />,
            )
          }
          className={clsx(
            'cursor-pointer flex flex-col gap-10 rounded-8 py-12 px-12 tablet:px-14',
            'transition-transform duration-300 ease-in-out',
            snapshot.isDragging && 'scale-105',
            'bg-background-tertiary dark:bg-background-tertiary-dark',
            'shadow-task',
          )}
          style={{
            ...provided.draggableProps.style,
            transform: snapshot.isDragging
              ? `${provided.draggableProps.style?.transform} scale(1.05)`
              : provided.draggableProps.style?.transform,
          }}
        >
          <div className='flex justify-between w-full items-center'>
            <div className='flex gap-12'>
              <div className='flex gap-6 tablet:gap-8 items-center'>
                <Checkbox checked={isDone} handleClick={handleDoneTask} />
                <div className='relative'>
                  {isDone && (
                    <span className='absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-text-primary dark:bg-text-primary-dark animate-line-through w-full' />
                  )}
                  <span
                    className={clsx(
                      'text-text-primary dark:text-text-primary-dark text-md font-normal',
                      'line-clamp-1',
                    )}
                  >
                    {name}
                  </span>
                </div>
              </div>

              <div className='flex gap-2 items-center'>
                <IconComment />

                <span className='text-xs font-normal text-text-default dark:text-text-default-dark'>
                  {commentCount}
                </span>
              </div>
            </div>

            <div className='flex items-baseline'>
              <PriorityButton
                task={task}
                isPriority={isPriority}
                className='hidden tablet:block'
              />
              {currentUser.id === writer.id && (
                <EditDeleteDropdown
                  trigger={<IconKebabSmall />}
                  handleEdit={() => setModalOpen(<TaskEditModal task={task} />)}
                  handleDelete={() =>
                    setModalOpen(<TaskDeleteModal task={task} />)
                  }
                />
              )}
            </div>
          </div>

          <div className='flex justify-between'>
            <div className='flex items-center gap-10'>
              <div className='flex gap-6 items-center'>
                <IconCalendar width={16} height={16} />

                <span className='text-xs font-normal text-text-default dark:text-text-default-dark'>
                  {isMobile
                    ? getMonthDay(date, undefined, false)
                    : getDate(date)}
                </span>
              </div>

              <div className='w-1 h-8 rounded bg-text-default' />

              <div className='flex gap-6 items-center'>
                <IconRepeat />

                <span className='text-xs font-normal text-text-default dark:text-text-default-dark'>
                  {getDaily(frequency)}
                </span>
              </div>
            </div>
            <PriorityButton
              task={task}
              isPriority={isPriority}
              className='block tablet:hidden'
            />
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default Task;
