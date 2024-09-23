import {
  IconKebabLarge,
  IconProgressDone,
  IconProgressOngoing,
} from '@/assets/IconList';
import Link from 'next/link';
import GroupDropDown from './GroupDropDown';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  color: string;
  doneCount: number;
  totalCount: number;
  isDone: boolean;
  groupId: number;
  taskListId: number;
}

function GroupTaskList({
  children,
  color = 'purple',
  isDone = false,
  doneCount = 0,
  totalCount = 0,
  groupId = 0,
  taskListId = 0,
}: Props) {
  return (
    <div className='w-full h-40 rounded-12 bg-background-secondary flex text-md text-text-primary'>
      <div className={`w-12 h-full rounded-l-12 bg-point-${color}`} />
      <div className='w-full px-12 flex items-center justify-between'>
        <Link
          href={`/group/${groupId}/tasklist/${taskListId}`}
          className='w-full'
        >
          {children}
        </Link>
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
          {/* TODO 그룹 목록 수정하기, 삭제하기 구현(모달???) */}
          <GroupDropDown
            icon='kebab'
            handleEdit={() => {}}
            handleDelete={() => {}}
          />
        </div>
      </div>
    </div>
  );
}

export default GroupTaskList;
