import { IconMenu } from '@/assets/IconList';
import { patchTaskListOrder } from '@/services/TaskListAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import TaskLists from './TaskLists';

function TaskListMenu() {
  // TODO taskList 무한 스크롤 구현
  const queryClient = useQueryClient();

  const updateTaskListOrderMutation = useMutation({
    mutationFn: ({ groupId, taskListId, displayIndex }: OrderTaskList) =>
      patchTaskListOrder(groupId, taskListId, displayIndex),
    onMutate: (variables) => {
      // groupId를 context에 저장
      return { groupId: variables.groupId };
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ['getTaskLists', variables.groupId],
      });
    },
  });

  const handleTaskListDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    // destination이 없으면 드래그가 실패한 것이므로 아무 작업도 하지 않음
    if (!destination) return;

    const startTaskListIndex = source.index;
    const endTaskListIndex = destination.index; // 드래그 끝 index

    // start랑 End가 index가 똑같으면 움직이지 않은 것이므로 액션없음
    if (startTaskListIndex === endTaskListIndex) return;

    const currentGroupId = destination.droppableId; // 현재 그룹 droppabled id

    updateTaskListOrderMutation.mutate({
      groupId: Number(currentGroupId),
      taskListId: Number(draggableId),
      displayIndex: endTaskListIndex,
    });
  };

  return (
    <DragDropContext onDragEnd={handleTaskListDragEnd}>
      <section className='h-[88%] w-70 tablet:w-100 rounded-12 bg-background-secondary px-10 tablet:px-15 items-center py-25 text-center'>
        <div className='flex items-center justify-center'>
          <p className='text-text-default text-md text-medium hidden tablet:block'>
            목록 메뉴
          </p>
          <IconMenu className='block tablet:hidden mb-8' />
        </div>
        <div className='h-3 bg-background-tertiary w-full rounded-8 my-10' />

        <div className='h-[calc(100%-40px)] overscroll-contain w-full overflow-y-auto'>
          <TaskLists />
        </div>
      </section>
    </DragDropContext>
  );
}
export default TaskListMenu;
