import clsx from 'clsx';
import Link from 'next/link';
import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import useCurrentTaskListName from '../useCurrentTaskListName';

interface TaskListProps {
  taskList: TaskList;
  groupId: number;
  taskListId: number;
}

function TaskList({ taskList, groupId, taskListId }: TaskListProps) {
  const { setCurrentName } = useCurrentTaskListName();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    if (taskListId === taskList.id) setCurrentName(taskList.name);
  }, []);

  return (
    <Link
      key={taskList.id}
      href={`/group/${groupId}/tasklist/${taskList.id}`}
      onClick={() => setCurrentName(taskList.name)}
      className={clsx(
        'text-text-secondary text-lg font-medium p-10 rounded-8 transition-all duration-300 ease-in-out',
        'hover:bg-brand-secondary w-full truncate transform',
        taskListId === taskList.id && 'text-white bg-brand-primary',
      )}
    >
      {isMobile ? '⦁' : taskList.name}
    </Link>
  );
}

export default TaskList;
