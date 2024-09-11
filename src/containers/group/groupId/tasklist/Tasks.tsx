import { IconCalendar, IconPlus } from '@/assets/IconList';
import ArrowButton from '@/components/button/arrowButton';
import TaskCreateDateModal from '@/components/modal/TaskCreateDateModal';
import TaskCreateModal from '@/components/modal/TaskCreateModal';
import useTaskLists from '@/hooks/useTaskLists';
import useTasks from '@/hooks/useTasks';
import useModalStore from '@/stores/ModalStore';
import getMonthDay from '@/utils/getMonthDay';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Task from './Task';

function Tasks() {
  const { setModalOpen } = useModalStore();

  // 기본으로는 현재 날짜, 화살표 버튼을 통해 날짜 변경함
  const [date, setDate] = useState<Date>(new Date());

  const router = useRouter();
  const { groupId, tasklistId } = router.query;

  const { tasks, isLoading, error } = useTasks(
    Number(groupId),
    Number(tasklistId),
  );

  const { taskLists, isLoading: isListLoading } = useTaskLists(Number(groupId));

  if (isLoading) return <>로딩중 ... </>;
  if (isListLoading) return <>리스트 로딩</>;

  return (
    <main className='main-container relative h-[80vh]'>
      <div className='flex flex-col gap-[24px]'>
        <h2 className='text-xl font-bold text-text-primary'>할 일</h2>
        <div className='flex justify-between items-center'>
          <div className='flex gap-[12px] items-center'>
            <span className='text-lg font-medium text-text-primary'>
              {getMonthDay(date)}
            </span>
            <div className='flex gap-4'>
              <ArrowButton direction='left' />
              <ArrowButton direction='right' />
            </div>
            <button type='button' aria-label='캘린더'>
              <IconCalendar width={16} height={16} />
            </button>
            {/* TODO 버튼들 수정하기 */}
          </div>
          <button
            type='button'
            onClick={() =>
              setModalOpen(<TaskCreateModal groupId={Number(groupId)} />)
            }
            className='text-brand-primary'
          >
            + 새로운 목록 추가하기
          </button>
        </div>
        <div className='flex flex-col gap-[16px]'>
          <div className='flex items-center gap-[12px]'>
            {taskLists.map((taskList) => (
              <Link
                key={taskList.id}
                href={`/group/${groupId}/tasklist/${taskList.id}`}
                className={clsx(
                  'text-text-default text-lg font-medium',
                  Number(tasklistId) === taskList.id &&
                    'text-white underline underline-offset-4',
                )}
              >
                {/* TODO href 주소 수정 */}
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
        onClick={() => setModalOpen(<TaskCreateDateModal />)}
        className='absolute right-24 bottom-24 tablet:bottom-25 desktop:right-0 desktop:bottom-49 bg-brand-primary flex gap-4 items-center px-21 py-14 rounded-40'
      >
        <IconPlus width={16} height={16} />
        <span className='text-white'>할 일 추가</span>
      </button>
    </main>
  );
}

export default Tasks;
