import {
  IconCalendar,
  IconCheckboxActive,
  IconComment,
  IconKebabSmall,
  IconRepeat,
} from '@/assets/IconList';
import getDate from '@/utils/getDate';

function getDaily(daily: string) {
  switch (daily) {
    case 'DAILY':
      return '매일 반복';
    case 'WEEKLY':
      '매주 반복';
    case 'MONTHLY':
      '매달 반복';
    case 'ONCE':
      '매일 반복';
    default:
      '기타';
  }
}

function List({ task }: { task: ITask }) {
  const { name, commentCount, updatedAt, frequency } = task;
  return (
    <div className='bg-background-secondary flex flex-col gap-[10px] rounded-[8px] py-[12px] px-[14px]'>
      <div className='flex justify-between w-full items-center'>
        <div className='flex gap-[12px]'>
          <div className='flex gap-[8px] items-center'>
            <IconCheckboxActive />
            <span className='text-text-primary text-md font-normal'>
              {name}
            </span>
          </div>
          <div className='flex gap-[2px] items-center'>
            <IconComment />
            <span className='text-xs font-normal text-text-default'>
              {commentCount}
            </span>
          </div>
        </div>
        <IconKebabSmall />
      </div>
      <div className='flex items-center gap-[10px]'>
        <div className='flex gap-[6px] items-center'>
          <IconCalendar />
          <span className='text-xs font-normal text-text-default'>
            {getDate(updatedAt)}
          </span>
        </div>
        <div className='w-[1px] h-[8px] rounded bg-background-tertiary' />
        <div className='flex gap-[6px] items-center'>
          <IconRepeat />
          <span className='text-xs font-normal text-text-default'>
            {getDaily(frequency)}
          </span>
        </div>
      </div>
    </div>
  );
}
export default List;
