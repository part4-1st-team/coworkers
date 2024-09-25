import useQueryParameter from '@/hooks/useQueryParameter';
import { Dispatch, SetStateAction } from 'react';
import useTaskMutation from './hooks/useTaskMutation';

function TaskDoneHandler(
  task: DateTask,
  isDone: boolean,
  setIsDone: Dispatch<SetStateAction<boolean>>,
) {
  const { groupId, taskListId } = useQueryParameter();

  const doneTaskMutation = useTaskMutation(
    task,
    groupId,
    taskListId,
    setIsDone,
  );

  const handleDoneTask = (e: any) => {
    e.stopPropagation();

    // 완료된 상태면
    if (isDone) {
      doneTaskMutation.mutate({ done: false });
    } else {
      doneTaskMutation.mutate({ done: true });
    }
  };

  return handleDoneTask;
}
export default TaskDoneHandler;
