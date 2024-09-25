import { IconCalendar } from '@/assets/IconList';
import ArrowButton from '@/components/button/arrowButton';
import Calendar from '@/components/calendar/Calendar';
import useQueryParameter from '@/hooks/useQueryParameter';
import useTaskLists from '@/hooks/useTaskLists';
import useTasks from '@/hooks/useTasks';
import getMonthDay from '@/utils/getMonthDay';
import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import TaskAddButton from '../TaskAddButton';
import useDayNavigation from '../useDayNavigation';
import Task from './Task';
import TodoAddButton from './TodoAddButton';

function Tasks() {
  // 기본으로는 현재 날짜, 화살표 버튼을 통해 날짜 변경함
  const [pickDate, setPickDate] = useState<Date>(new Date());

  const { groupId, taskListId } = useQueryParameter();

  const { tasks, isLoading } = useTasks(groupId, taskListId, String(pickDate));

  const { taskLists, isLoading: isListLoading } = useTaskLists(groupId);

  const handleNavigateDay = useDayNavigation(setPickDate);

  const handlePreviousDay = () => {
    handleNavigateDay('prev');
  };

  const handleNextDay = () => {
    handleNavigateDay('next');
  };

  if (isLoading) return <>임시 로딩중 ... </>;
  if (isListLoading) return <>임시 리스트 로딩</>;
  // TODO 로딩 처리하기

  return (
    <main className='main-container relative h-[80vh]'>
      <div className='flex flex-col gap-24'>
        <h2 className='text-xl font-bold text-text-primary'>할 일</h2>
        <div className='flex justify-between items-center'>
          <div className='flex gap-12 items-center'>
            <span className='text-lg font-medium text-text-primary'>
              {getMonthDay(pickDate)}
            </span>
            <div className='flex gap-4'>
              <ArrowButton direction='left' onClick={handlePreviousDay} />
              <ArrowButton direction='right' onClick={handleNextDay} />
            </div>
            <Calendar
              trigger={
                <button
                  type='button'
                  aria-label='캘린더'
                  className='flex items-center'
                >
                  <IconCalendar width={16} height={16} />
                </button>
              }
              pickDate={pickDate}
              setPickDate={setPickDate}
            />
          </div>
          <TaskAddButton />
        </div>
        <div className='flex flex-col gap-16'>
          <div className='flex items-center gap-12'>
            {taskLists.map((taskList) => (
              <Link
                key={taskList.id}
                href={`/group/${groupId}/tasklist/${taskList.id}`}
                className={clsx(
                  'text-text-default text-lg font-medium',
                  taskListId === taskList.id &&
                    'text-white underline underline-offset-4',
                )}
              >
                {taskList.name}
              </Link>
            ))}
          </div>
          <div className='flex flex-col gap-16'>
            {tasks.map((task: DateTask) => (
              <Task task={task} key={task.id} />
            ))}
          </div>
        </div>
      </div>
      <TodoAddButton />
    </main>
  );
}

export default Tasks;
