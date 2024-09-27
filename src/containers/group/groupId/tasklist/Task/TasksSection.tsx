import useQueryParameter from '@/hooks/useQueryParameter';
import { patchTaskOrder } from '@/services/TaskAPI';
import getMonthDay from '@/utils/getMonthDay';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import useDateStore from '../../useDateStore';
import Tasks from './Tasks';

function TasksSection() {
  // NOTE 일정 리스트 말고도 중요도 또는 분류하는 탭 추가 하면 좋을듯

  const queryClient = useQueryClient();
  const { pickDate } = useDateStore();
  const { groupId } = useQueryParameter();

  const updateTaskOrderMutation = useMutation({
    mutationFn: ({ taskListId, taskId, displayIndex }: OrderTask) =>
      patchTaskOrder(groupId, taskListId, taskId, displayIndex),
    onMutate: (variables) => {
      // groupId를 context에 저장
      return { taskListId: variables.taskListId };
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: [
          'getTasks',
          groupId,
          variables.taskListId,
          getMonthDay(pickDate),
        ],
      });
    },
  });

  const handleTaskDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    // destination이 없으면 드래그가 실패한 것이므로 아무 작업도 하지 않음
    if (!destination) return;

    const startTaskIndex = source.index;
    const endTaskIndex = destination.index; // 드래그 끝 index

    // start랑 End가 index가 똑같으면 움직이지 않은 것이므로 액션없음
    if (startTaskIndex === endTaskIndex) return;

    const currentTaskListId = destination.droppableId;

    updateTaskOrderMutation.mutate({
      taskListId: Number(currentTaskListId),
      taskId: Number(draggableId),
      displayIndex: endTaskIndex,
    });
  };

  return (
    <DragDropContext onDragEnd={handleTaskDragEnd}>
      <section className='flex flex-col py-25 px-30 bg-background-secondary w-full h-full rounded-12'>
        <div className='flex flex-col w-fit mb-10'>
          <p className='text-text-default text-md text-medium'>일정 리스트</p>
          <div className='h-3 bg-background-tertiary w-full rounded-8 my-10' />
        </div>
        <Tasks />
      </section>
    </DragDropContext>
  );
}
export default TasksSection;
