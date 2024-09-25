import useQueryParameter from '@/hooks/useQueryParameter';
import useTaskLists from '@/hooks/useTaskLists';
import { clsx } from 'clsx';
import Link from 'next/link';

function TaskLists() {
  const { groupId, taskListId } = useQueryParameter();

  const { taskLists, isLoading: isListLoading } = useTaskLists(groupId);

  return (
    <div className='flex items-center gap-12'>
      {taskLists.map((taskList) => (
        <Link
          key={taskList.id}
          href={`/group/${groupId}/tasklist/${taskList.id}`}
          className={clsx(
            'text-text-default text-lg font-medium',
            taskListId === taskList.id &&
              'text-white underline underline-offset-4',
          )}
        >
          {taskList.name}
        </Link>
      ))}
    </div>
  );
}

export default TaskLists;
