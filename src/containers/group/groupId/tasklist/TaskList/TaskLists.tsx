import useQueryParameter from '@/hooks/useQueryParameter';
import useTaskLists from '@/hooks/useTaskLists';
import TaskList from './TaskList';

function TaskLists() {
  const { groupId, taskListId } = useQueryParameter();

  const { taskLists, isLoading: isListLoading } = useTaskLists(groupId);

  return (
    <section className='overflow-y-auto overscroll-contain text-center flex flex-col items-center space-y-15'>
      {taskLists.map((taskList) => (
        <TaskList
          taskList={taskList}
          key={taskList.id}
          groupId={groupId}
          taskListId={taskListId}
        />
      ))}
    </section>
  );
}

export default TaskLists;
