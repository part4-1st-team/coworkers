import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useMediaQuery } from 'react-responsive';
import useCurrentTaskListName from '../useCurrentTaskListName';

interface TaskListProps {
  taskList: TaskList;
  groupId: number;
  taskListId: number;
  index: number;
}

function TaskList({ taskList, groupId, taskListId, index }: TaskListProps) {
  const { setCurrentName } = useCurrentTaskListName();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    if (taskListId === taskList.id) setCurrentName(taskList.name);
    setMounted(true);

    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return (
    <Draggable draggableId={String(taskList.id)} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={clsx(
            'text-text-secondary dark:text-text-secondary-dark text-lg font-medium p-10 rounded-8 transition-all duration-300 ease-in-out',
            'hover:bg-brand-secondary w-full truncate transform',
            taskListId === taskList.id && 'text-white bg-brand-primary',
            snapshot.isDragging && 'bg-background-tertiary',
          )}
          style={{
            ...provided.draggableProps.style,
            transform: snapshot.isDragging
              ? `${provided.draggableProps.style?.transform} scale(1.05)`
              : provided.draggableProps.style?.transform,
          }}
        >
          <Link
            href={`/group/${groupId}/tasklist/${taskList.id}`}
            onClick={() => setCurrentName(taskList.name)}
          >
            {isMobile ? '⦁' : taskList.name}
          </Link>
        </div>
      )}
    </Draggable>
  );
}

export default TaskList;
