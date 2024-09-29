import useQueryParameter from '@/hooks/useQueryParameter';
import useTasks from '@/hooks/useTasks';
import { Droppable } from 'react-beautiful-dnd';
import useDateStore from '../../useDateStore';
import Task from './Task';

function Tasks() {
  const { pickDate } = useDateStore();
  const { groupId, taskListId } = useQueryParameter();
  const { tasks, isLoading } = useTasks(groupId, taskListId, String(pickDate));

  if (isLoading) <>tasks 임시 로딩중~</>;

  // TODO task들 무한스크롤 구현

  if (tasks.length === 0)
    return (
      <section className='flex flex-col w-full h-full rounded-12 items-center justify-center text-md font-medium text-text-default'>
        아직 할 일 목록이 없습니다. <br />
        새로운 목록을 추가해주세요.
      </section>
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
            <Task task={task} key={task.id} index={index} />
          ))}
          {provided.placeholder}
        </section>
      )}
    </Droppable>
  );
}

export default Tasks;
