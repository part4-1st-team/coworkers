import TodoImg from '@/assets/images/img_todo.png';
import DoneImg from '@/assets/images/img_done.png';
import ProgressChart from '@/components/chart/ProgressChart';
import ReportSummary from '@/components/reportSummary/ReportSummary';

interface Props {
  doneCount: number;
  totalCount: number;
  todayCount: number;
}

function GroupReport({ doneCount = 0, totalCount = 0, todayCount = 0 }: Props) {
  let taskPercent = 0;
  if (totalCount !== 0) taskPercent = Math.ceil((doneCount / totalCount) * 100);

  return (
    <section className='w-full mt-48 desktop:mt-64'>
      <p className='mb-16'>리포트</p>
      <section className='w-full h-224 desktop:h-210 shadow-lg bg-background-secondary dark:bg-background-secondary-dark rounded-12 p-24 tablet:px-36 desktop:px-48 desktop:py-auto'>
        <div className='w-fill flex justify-between '>
          <ProgressChart percentage={taskPercent} labelToChartGap='gap-[5vw]' />
          <section className='w-1/2 max-w-400 flex flex-col gap-16'>
            <ReportSummary
              title='오늘의 할 일'
              count={todayCount}
              imgUrl={TodoImg}
              altText='todo image'
            />
            <ReportSummary
              title='완료한 일'
              count={doneCount}
              imgUrl={DoneImg}
              altText='done image'
            />
          </section>
        </div>
      </section>
    </section>
  );
}

export default GroupReport;
