import StarActiveIcon from '@/components/icon/StarActive';
import StarEmptyIcon from '@/components/icon/StarEmtpy';
import useUserStore from '@/stores/userStore';
import { useRouter } from 'next/router';
import { twMerge } from 'tailwind-merge';
import useDateStore from '../../useDateStore';
import usePriorityMutation from '../ListPriority/usePriorityMutation';

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

  const { user } = useUserStore();
  const { pickDate } = useDateStore();

  const priorityMutation = usePriorityMutation(
    groupId,
    taskListId,
    task,
    pickDate,
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    user?.id!,
  );

  return (
    <button
      type='button'
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        priorityMutation.mutate({});
      }}
      className={twMerge(className)}
    >
      {isPriority ? <StarActiveIcon size={16} /> : <StarEmptyIcon size={16} />}
    </button>
  );
}

export default PriorityButton;
