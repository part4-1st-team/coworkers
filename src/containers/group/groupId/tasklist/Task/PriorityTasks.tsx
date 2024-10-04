import getMonthDay from '@/utils/getMonthDay';
import { useRouter } from 'next/router';
import { Droppable } from 'react-beautiful-dnd';
import useDateStore from '../../useDateStore';
import useTaskPriority from '../ListPriority/useTaskPriority';
import EmptyTasks from './EmptyTasks';
import Task from './Task';

function PriorityTasks() {
  const router = useRouter();
  const { pickDate } = useDateStore();

  const { groupId, taskListId } = router.query;
  const { priorityTasks, isLoading } = useTaskPriority(
    Number(groupId),
    Number(taskListId),
    getMonthDay(pickDate),
  );

  if (isLoading) return <>임시 로딩</>;

  if (!priorityTasks?.length)
    return (
      <EmptyTasks
        message={`아직 즐겨찾기한 할 일 목록이 없습니다. \n 할 일을 즐겨찾기 해보세요!`}
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
          {priorityTasks.map((priorityTask, index) => (
            <Task
              task={priorityTask.task}
              key={priorityTask.taskId}
              index={index}
              isPriority
            />
          ))}
        </section>
      )}
    </Droppable>
  );
}

export default PriorityTasks;
