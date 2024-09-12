import {
  IconCalendar,
  IconCheckboxDefault,
  IconComment,
  IconRepeat,
} from '@/assets/IconList';
import useHalfPageStore from '@/stores/HalfPageStore';
import getDaily from '@/utils/getDaily';
import getDate from '@/utils/getDate';
import KebabDropdown from './comment/KebabDropdown';
import HalfPageContent from './HalfListContent';

function Task({ task }: { task: DateTask }) {
  const { name, commentCount, updatedAt, frequency } = task;
  const { setHalfPageOpen } = useHalfPageStore();

  return (
    /* eslint-disable jsx-a11y/click-events-have-key-events */
    <div
      role='button'
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setHalfPageOpen(<HalfPageContent task={task} />);
        }
      }}
      onClick={() => setHalfPageOpen(<HalfPageContent task={task} />)}
      className='cursor-pointer bg-background-secondary flex flex-col gap-10 rounded-8 py-12 px-14'
    >
      <div className='flex justify-between w-full items-center'>
        <div className='flex gap-12'>
          <div className='flex gap-8 items-center'>
            <IconCheckboxDefault />
            <span className='text-text-primary text-md font-normal'>
              {name}
            </span>
          </div>
          <div className='flex gap-2 items-center'>
            <IconComment />
            <span className='text-xs font-normal text-text-default'>
              {commentCount}
            </span>
          </div>
        </div>
        <KebabDropdown
          handleEdit={() => console.log('수정')}
          handleDelete={() => console.log('삭제')}
        />
      </div>
      <div className='flex items-center gap-10'>
        <div className='flex gap-6 items-center'>
          <IconCalendar width={16} height={16} />
          <span className='text-xs font-normal text-text-default'>
            {getDate(updatedAt)}
          </span>
        </div>
        <div className='w-1 h-8 rounded bg-background-tertiary' />
        <div className='flex gap-6 items-center'>
          <IconRepeat />
          <span className='text-xs font-normal text-text-default'>
            {getDaily(frequency)}
          </span>
        </div>
      </div>
    </div>
  );
}
export default Task;
