import TodoImg from '@/assets/images/img_todo.png';
import DoneImg from '@/assets/images/img_done.png';
import ReportSummary from '@/components/reportSummary/ReportSummary';
import ProgressChart from '@/components/chart/ProgressChart';

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
        className='w-fill h-224 shadow-md bg-background-secondary dark:bg-background-secondary-dark rounded-12 p-24 
        tablet:px-36 desktop:p-24 flex justify-between'
      >
        <ProgressChart
          percentage={percentage}
          label={list.name}
          labelToChartGap='gap-[5vw] desktop:gap-[2vw]'
        />
        <section className='w-1/2 max-w-400 desktop:max-w-184 flex flex-col gap-16'>
          <ReportSummary
            title='오늘의 할 일'
            count={todayTasks}
            imgUrl={TodoImg}
            altText='todo image'
          />
          <ReportSummary
            title='완료한 일'
            count={doneTaskCount}
            imgUrl={DoneImg}
            altText='done image'
          />
        </section>
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
