import { IconCheckboxActive, IconKebabSmall } from '@/assets/IconList';

function HistoryList({ task }: { task: ITask }) {
  const { name } = task;
  return (
    <div className='w-full flex justify-between items-center bg-background-secondary py-[10px] px-[14px] rounded-[8px]'>
      <div className='flex gap-[7px] items-center'>
        <IconCheckboxActive />
        <span className='text-text-primary text-md font-normal line-through'>
          {name}
        </span>
      </div>
      <IconKebabSmall />
    </div>
  );
}

export default HistoryList;
