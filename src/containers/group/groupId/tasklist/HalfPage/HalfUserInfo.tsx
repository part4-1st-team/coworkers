import { IconCalendar, IconRepeat } from '@/assets/IconList';
import getDaily from '@/utils/getDaily';
import getDate from '@/utils/getDate';

function HalfUserInfo({ task }: { task: DateTask }) {
  const { writer, updatedAt, date, frequency } = task;

  const { nickname } = writer;

  return (
    <>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-12'>
          <div className='w-32 h-32 rounded-[9999px] bg-white' />
          <span className='text-md font-medium text-text-primary'>
            {nickname}
          </span>
        </div>
        <span className='text-md font-normal text-text-secondary'>
          {getDate(updatedAt, true)}
        </span>
      </div>
      <div className='flex gap-10 items-center'>
        <div className='flex items-center gap-6'>
          <IconCalendar width={16} height={16} />
          <span className='text-text-default text-xs font-normal'>
            {getDate(date)}
          </span>
        </div>
        <div className='w-1 h-8 bg-background-tertiary rounded-4' />
        <div className='flex items-center gap-6'>
          <IconRepeat width={16} height={16} />
          <span className='text-text-default text-xs font-normal'>
            {getDaily(frequency)}
          </span>
        </div>
      </div>
    </>
  );
}

export default HalfUserInfo;
