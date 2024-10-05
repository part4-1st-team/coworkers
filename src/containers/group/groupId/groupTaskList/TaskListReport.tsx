import Image from 'next/image';
import TodoImg from '@/assets/images/img_todo.png';
import DoneImg from '@/assets/images/img_done.png';
import DoughnutChart from '@/components/chart/DoughnutChart';

// TODO 스타일 작업

function TaskListReport({ Lists }: { Lists: TaskList[] }) {
  const renderTaskList = (list: TaskList) => {
    const doneTaskCount = list.tasks.filter(
      (task) => task.doneAt !== null,
    ).length;

    const today = new Date();
    const todayTasks = list.tasks.filter((task) => {
      const taskDate = new Date(task.date);
      return (
        taskDate.getFullYear() === today.getFullYear() &&
        taskDate.getMonth() === today.getMonth() &&
        taskDate.getDate() === today.getDate()
      );
    }).length;

    const totalTasks = list.tasks.length;
    const percentage = totalTasks > 0 ? (doneTaskCount / totalTasks) * 100 : 0;

    return (
      <section
        key={list.id}
        className='w-fill h-224 shadow-md bg-background-secondary dark:bg-background-secondary-dark rounded-12 p-24 tablet:px-36 desktop:p-24'
      >
        <div className='w-fill flex justify-between'>
          <div className='flex mr-12 items-center gap-42 desktop:gap-22 justify-between'>
            <DoughnutChart percentage={percentage} />
            <div className='absolute w-150 h-150 flex flex-col items-center justify-center tablet:hidden'>
              <p className='text-xs font-medium'>{list.name}</p>
              <p className='text-xl font-bold'>{percentage.toFixed(0)}%</p>
            </div>
            <div className='hidden tablet:flex flex-col gap-16'>
              <div className='text-md'>{list.name}</div>
              <p className='text-4xl font-bold'>{percentage.toFixed(0)}%</p>
            </div>
          </div>
          <section className='w-1/2 max-w-400 desktop:max-w-184 flex flex-col gap-16'>
            <div className='w-full min-w-130 h-76 rounded-12 shadow-md bg-background-tertiary dark:bg-background-tertiary-dark p-16 flex justify-between items-center'>
              <div className='flex flex-col gap-6'>
                <p className='text-xs'>오늘의 할 일</p>
                <p className='text-2xl text-brand-tertiary font-bold'>
                  {todayTasks}개
                </p>
              </div>
              <div>
                <Image src={TodoImg} alt='todo image' width={40} height={40} />
              </div>
            </div>
            <div className='w-full min-w-130 h-76 rounded-12 shadow-md bg-background-tertiary dark:bg-background-tertiary-dark p-16 flex justify-between items-center'>
              <div className='flex flex-col gap-6'>
                <p className='text-xs'>완료한 일</p>
                <p className='text-2xl text-brand-tertiary font-bold'>
                  {doneTaskCount}개
                </p>
              </div>
              <div>
                <Image src={DoneImg} alt='done image' width={40} height={40} />
              </div>
            </div>
          </section>
        </div>
      </section>
    );
  };

  return (
    <div className='flex flex-col desktop:grid grid-cols-2 gap-16'>
      {Lists.length === 0 ? (
        <div className='text-14 font-md text-text-default mx-auto mt-64 mb-48 desktop:mb-64'>
          아직 할 일 목록이 없습니다.
        </div>
      ) : (
        <>{Lists.map(renderTaskList)}</>
      )}
    </div>
  );
}

export default TaskListReport;
