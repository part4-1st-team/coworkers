import { IconProgressDone, IconProgressOngoing } from '@/assets/IconList';
import Link from 'next/link';
import useModalStore from '@/stores/ModalStore';
import TaskListDeleteModal from '@/components/modal/TaskListDeleteModal';
import TaskListEditModal from '@/components/modal/TaskListEditModal';
import GroupDropDown from './GroupDropDown';

interface Props {
  color: string;
  doneCount: number;
  totalCount: number;
  isDone: boolean;
  groupId: number;
  taskListId: number;
  taskListName: string;
}

function GroupTaskList({
  color = 'bg-point-purple',
  isDone = false,
  doneCount = 0,
  totalCount = 0,
  groupId = 0,
  taskListId = 0,
  taskListName = '',
}: Props) {
  const { setModalOpen } = useModalStore();

  return (
    <div
      className='relative shadow-md w-full h-40 rounded-12 bg-background-secondary flex text-md text-text-primary
    dark:bg-background-secondary-dark dark:text-text-primary-dark'
    >
      <div className={`absolute w-12 h-full rounded-l-12 ${color}`} />
      <div className='w-full px-12 flex items-center justify-between'>
        <Link
          href={`/group/${groupId}/tasklist/${taskListId}`}
          className='w-full pl-12 overflow-hidden text-ellipsis whitespace-nowrap'
          title={taskListName}
        >
          {taskListName}
        </Link>
        <div className='flex '>
          <section className=' flex items-center'>
            <div className='py-4 px-8 bg-background-primary dark:bg-background-primary-dark rounded-12 flex text-brand-primary gap-4'>
              {isDone ? (
                <IconProgressDone className='fill-brand-primary' />
              ) : (
                <IconProgressOngoing className='stroke-brand-primary' />
              )}
              {`${doneCount}/${totalCount}`}
            </div>
          </section>
          <GroupDropDown
            icon='kebab'
            handleEdit={() =>
              setModalOpen(
                <TaskListEditModal
                  taskListId={taskListId}
                  groupId={groupId}
                  taskListName={taskListName}
                />,
              )
            }
            handleDelete={() =>
              setModalOpen(<TaskListDeleteModal taskListId={taskListId} />)
            }
          />
        </div>
      </div>
    </div>
  );
}

export default GroupTaskList;
