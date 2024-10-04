import useUserStore from '@/stores/userStore';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import useDateStore from '../useDateStore';
import useTaskMutation from './hooks/useTaskMutation';
import usePriorityMutation from './ListPriority/usePriorityMutation';

function TaskDoneHandler(
  task: DateTask,
  isDone: boolean,
  setIsDone: Dispatch<SetStateAction<boolean>>,
) {
  const router = useRouter();
  const { groupId, taskListId } = router.query;
  const { user } = useUserStore();

  const { pickDate } = useDateStore();

  const doneTaskMutation = useTaskMutation(
    task,
    Number(groupId),
    Number(taskListId),
    setIsDone,
  );

  const priorityMutation = usePriorityMutation(
    groupId,
    taskListId,
    task,
    pickDate,
    user?.id!,
  );

  const handleDoneTask = (e: any) => {
    e.stopPropagation();

    // 완료된 상태면
    if (isDone) {
      doneTaskMutation.mutate({ done: false });
      priorityMutation.mutate({ isPatch: true, done: false });
    } else {
      doneTaskMutation.mutate({ done: true });
      priorityMutation.mutate({ isPatch: true, done: true });
    }
  };

  return handleDoneTask;
}
export default TaskDoneHandler;
