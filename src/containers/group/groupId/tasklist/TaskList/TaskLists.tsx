import useQueryParameter from '@/hooks/useQueryParameter';
import useTaskLists from '@/hooks/useTaskLists';
import { useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TaskList from './TaskList';

function TaskLists() {
  const [mounted, setMounted] = useState<boolean>(false);

  const { groupId, taskListId } = useQueryParameter();

  const { taskLists, isLoading: isListLoading } = useTaskLists(groupId);

  useEffect(() => {
    setMounted(true); // 클라이언트에서만 활성화

    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return (
    <Droppable droppableId={groupId ? String(groupId) : 'default-droppable'}>
      {(provided, snapshot) => (
        <section
          {...provided.droppableProps}
          ref={provided.innerRef}
          className='text-center flex flex-col items-center space-y-15'
        >
          {taskLists.map((taskList, index) => (
            <TaskList
              taskList={taskList}
              key={taskList.id}
              groupId={groupId}
              taskListId={taskListId}
              index={index}
            />
          ))}
          {provided.placeholder}
        </section>
      )}
    </Droppable>
  );
}

export default TaskLists;
