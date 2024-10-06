import useTasks from '@/hooks/useTasks';
import getMonthDay from '@/utils/getMonthDay';
import { useRouter } from 'next/router';
import { Droppable } from 'react-beautiful-dnd';
import useDateStore from '../../useDateStore';
import useTaskPriority from '../ListPriority/useTaskPriority';
import EmptyTasks from './EmptyTasks';
import Task from './Task';

function Tasks() {
  const { pickDate } = useDateStore();

  const router = useRouter();
  const { groupId, taskListId } = router.query;

  const { tasks, isLoading } = useTasks(
    Number(groupId),
    Number(taskListId),
    String(pickDate),
  );

  const { priorityTasks, isLoading: isPriorityLoading } = useTaskPriority(
    Number(groupId),
    Number(taskListId),
    getMonthDay(pickDate),
  );

  if (isLoading) <>tasks 임시 로딩중~</>;

  // TODO task들 무한스크롤 구현

  if (tasks.length === 0)
    return (
      <EmptyTasks
        message={`아직 할 일 목록이 없습니다. \n새로운 목록을 추가해주세요.`}
      />
    );

  return (
    <Droppable droppableId={String(taskListId)}>
      {(provided) => (
        <section
          {...provided.droppableProps}
          ref={provided.innerRef}
          className='overflow-y-auto overscroll-contain flex flex-col gap-12 tablet:gap-16 desktop:gap-20 w-full h-full rounded-12'
        >
          {tasks.map((task: DateTask, index) => (
            <Task
              task={task}
              key={task.id}
              index={index}
              isPriority={priorityTasks?.some((priorityTask) => {
                return Number(priorityTask.taskId) === Number(task.id);
              })}
            />
          ))}
          {provided.placeholder}
        </section>
      )}
    </Droppable>
  );
}

export default Tasks;
