import {
  IconKebabLarge,
  IconProgressDone,
  IconProgressOngoing,
} from '@/assets/IconList';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  color: string;
  doneCount: number;
  totalCount: number;
  isDone: boolean;
}

function GroupTaskList({
  children,
  color = 'purple',
  isDone = false,
  doneCount = 0,
  totalCount = 0,
}: Props) {
  return (
    <div className='w-full h-40 rounded-12 bg-background-secondary flex text-md text-text-primary'>
      <div className={`w-12 h-full rounded-l-12 bg-point-${color}`} />
      <div className='w-full px-12 flex items-center justify-between'>
        <section>{children}</section>
        <div className='flex '>
          <section className=' flex items-center'>
            <div className='py-4 px-8 bg-background-primary rounded-12 flex text-brand-primary gap-4'>
              {isDone ? (
                <IconProgressDone className='fill-brand-primary' />
              ) : (
                <IconProgressOngoing className='stroke-brand-primary' />
              )}
              {`${doneCount}/${totalCount}`}
            </div>
          </section>
          <IconKebabLarge />
        </div>
      </div>
    </div>
  );
}

export default GroupTaskList;
