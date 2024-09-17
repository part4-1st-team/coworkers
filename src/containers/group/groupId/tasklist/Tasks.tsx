import { IconCalendar, IconPlus } from '@/assets/IconList';
import ArrowButton from '@/components/button/arrowButton';
import Calendar from '@/components/calendar/Calendar';
import TaskCreateDateModal from '@/components/modal/TaskCreateDateModal';
import useQueryParameter from '@/hooks/useQueryParameter';
import useTaskLists from '@/hooks/useTaskLists';
import useTasks from '@/hooks/useTasks';
import useModalStore from '@/stores/ModalStore';
import getMonthDay from '@/utils/getMonthDay';
import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import TaskAddButton from '../TaskAddButton';
import Task from './Task';

function Tasks() {
  const { setModalOpen } = useModalStore();

  // 기본으로는 현재 날짜, 화살표 버튼을 통해 날짜 변경함
  const [pickDate, setPickDate] = useState<Date>(new Date());

  const { groupId, taskListId } = useQueryParameter();

  const { tasks, isLoading } = useTasks(groupId, taskListId, String(pickDate));

  const { taskLists, isLoading: isListLoading } = useTaskLists(groupId);

  const handlePreviousDay = () => {
    setPickDate((prevDate) => {
      const newDate = new Date(prevDate); // 이전 상태 복사
      newDate.setDate(newDate.getDate() - 1); // 하루 전날로 변경
      return newDate;
    });
  };

  const handleNextDay = () => {
    setPickDate((prevDate) => {
      const newDate = new Date(prevDate); // 이전 상태 복사
      newDate.setDate(newDate.getDate() + 1); // 하루 전날로 변경
      return newDate;
    });
  };

  if (isLoading) return <>임시 로딩중 ... </>;
  if (isListLoading) return <>임시 리스트 로딩</>;
  // TODO 로딩 처리하기

  return (
    <main className='main-container relative h-[80vh]'>
      <div className='flex flex-col gap-[24px]'>
        <h2 className='text-xl font-bold text-text-primary'>할 일</h2>
        <div className='flex justify-between items-center'>
          <div className='flex gap-[12px] items-center'>
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
        <div className='flex flex-col gap-[16px]'>
          <div className='flex items-center gap-[12px]'>
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
          <div className='flex flex-col gap-[16px]'>
            {tasks.map((task: DateTask) => (
              <Task task={task} key={task.id} />
            ))}
          </div>
        </div>
      </div>
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
    </main>
  );
}

export default Tasks;
