import StarActiveIcon from '@/components/icon/StarActive';
import StarEmptyIcon from '@/components/icon/StarEmtpy';
import useToast from '@/components/toast/useToast';
import { postTaskPriority } from '@/services/TaskPriority.API';
import getMonthDay from '@/utils/getMonthDay';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { twMerge } from 'tailwind-merge';
import useDateStore from '../../useDateStore';

function PriorityButton({
  task,
  isPriority,
  className,
}: {
  task: DateTask;
  isPriority?: boolean;
  className?: string;
}) {
  const router = useRouter();
  const { groupId, taskListId } = router.query;
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { pickDate } = useDateStore();

  const priorityMutation = useMutation({
    mutationFn: () =>
      postTaskPriority(
        Number(groupId),
        Number(taskListId),
        task,
        getMonthDay(pickDate),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getPriorityTasks', Number(groupId), Number(taskListId)],
      });
    },
  });

  return (
    <button
      type='button'
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        priorityMutation.mutate();
      }}
      className={twMerge(className)}
    >
      {isPriority ? <StarActiveIcon size={16} /> : <StarEmptyIcon size={16} />}
    </button>
  );
}

export default PriorityButton;
