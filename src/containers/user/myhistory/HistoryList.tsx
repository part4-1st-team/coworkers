import { IconCheckboxActive, IconKebabSmall } from '@/assets/IconList';

function HistoryList({ task }: { task: DoneTask }) {
  const { name } = task;
  return (
    <div className='w-full flex justify-between items-center bg-background-secondary py-10 px-14 rounded-8'>
      <div className='flex gap-7 items-center'>
        <IconCheckboxActive />
        <span className='text-text-primary text-md font-normal line-through'>
          {name}
        </span>
      </div>
      <button type='button' aria-label='히스토리 수정 삭제 케밥'>
        <IconKebabSmall className='cursor-pointer' />
      </button>
    </div>
  );
}

export default HistoryList;
