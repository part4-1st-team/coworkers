import useQueryParameter from '@/hooks/useQueryParameter';
import useTasks from '@/hooks/useTasks';
import Task from './Task';

interface TasksProps {
  pickDate: Date;
}

function Tasks({ pickDate }: TasksProps) {
  const { groupId, taskListId } = useQueryParameter();
  const { tasks, isLoading } = useTasks(groupId, taskListId, String(pickDate));

  if (isLoading) <>tasks 임시 로딩중~</>;

  return (
    <section className='flex flex-col gap-16'>
      {tasks.map((task: DateTask) => (
        <Task task={task} key={task.id} />
      ))}
    </section>
  );
}

export default Tasks;
