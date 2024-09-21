import Image from 'next/image';

import TodoImg from '@/assets/images/img_todo.png';
import DoneImg from '@/assets/images/img_done.png';
import DoughnutChart from '@/components/chart/DoughnutChart';

interface Props {
  doneCount: number;
  totalCount: number;
}

function GroupReport({ doneCount = 0, totalCount = 0 }: Props) {
  const taskPercent = Math.ceil((doneCount / totalCount) * 100);

  return (
    <section className='w-full mt-48 desktop:mt-64'>
      <p className='mb-16'>리포트</p>
      <section className='w-full h-224 bg-background-secondary rounded-12 p-24 tablet:px-36 desktop:px-48'>
        <div className='w-fill flex justify-between '>
          <div className='flex gap-64 items-center'>
            <DoughnutChart percentage={taskPercent} />
            <div className='absolute w-150 h-150 flex flex-col items-center justify-center tablet:hidden '>
              <p className='text-xs font-medium'>오늘</p>
              {/* TODO 텍스트 그라데이션 적용 */}
              <p className='text-xl font-bold'>{taskPercent}%</p>
            </div>
            <div className='hidden tablet:flex flex-col gap-16'>
              <div className='text-md'>
                <p>오늘의</p>
                <p>진행 상황</p>
              </div>
              {/* TODO 텍스트 그라데이션 적용 (text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-tertiary) */}
              <p className='text-4xl font-[700] '>{taskPercent}%</p>
            </div>
          </div>
          <section className='w-1/2 max-w-400 flex flex-col gap-16'>
            <div className='w-full min-w-130 h-76 rounded-12 bg-background-tertiary p-16 flex justify-between items-center'>
              <div className='flex flex-col gap-6'>
                <p className='text-xs'>오늘의 할 일</p>
                <p className='text-2xl text-brand-tertiary font-bold'>
                  {totalCount}개
                </p>
              </div>
              <div>
                <Image src={TodoImg} alt='todo image' width={40} height={40} />
              </div>
            </div>
            <div className='w-full min-w-130 h-76 rounded-12 bg-background-tertiary p-16 flex justify-between items-center'>
              <div className='flex flex-col gap-6'>
                <p className='text-xs'>한 일</p>
                <p className='text-2xl text-brand-tertiary font-bold'>
                  {doneCount}개
                </p>
              </div>
              <div>
                <Image src={DoneImg} alt='done image' width={40} height={40} />
              </div>
            </div>
          </section>
        </div>
      </section>
    </section>
  );
}

export default GroupReport;
