import DoughnutChart from '@/components/chart/DoughnutChart';
import clsx from 'clsx';

interface ProgressChartProps {
  percentage: number;
  label?: string;
  labelToChartGap?: string;
}

function ProgressChart({
  percentage,
  label,
  labelToChartGap,
}: ProgressChartProps) {
  return (
    <div className={clsx('w-fill flex items-center', labelToChartGap)}>
      <div className='relative size-150 tablet:size-176'>
        <DoughnutChart percentage={percentage} />
      </div>
      <div className='absolute w-150 h-150 flex flex-col items-center justify-center tablet:hidden'>
        {label !== undefined ? (
          <p className='max-w-120 text-xs font-medium text-center'>{label}</p>
        ) : (
          <p className='max-w-120 text-xs font-medium text-center'>오늘</p>
        )}
        <p className='text-xl font-bold'>{percentage}%</p>
      </div>
      <div className='hidden tablet:flex flex-col gap-16'>
        {label !== undefined ? (
          <p className='text-md w-180 pr-18'>{label}</p>
        ) : (
          <p className='text-md w-180 pr-18'>
            오늘의
            <br />
            진행상황
          </p>
        )}

        <p className='text-4xl font-bold'>{percentage}%</p>
      </div>
    </div>
  );
}

export default ProgressChart;
