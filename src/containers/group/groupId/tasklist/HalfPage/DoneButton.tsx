import FloatingButton from '@/components/button/floatingButton';
import TooltipWrapper from '@/components/tooltip/TooltipWrapper';
import useQueryParameter from '@/hooks/useQueryParameter';
import { Dispatch, SetStateAction } from 'react';
import useTaskMutation from '../hooks/useTaskMutation';

interface Props {
  task: DateTask;
  setIsDone: Dispatch<SetStateAction<boolean>>;
  setDone: Dispatch<SetStateAction<boolean>>;
  done: boolean;
}

function DoneButton({ task, setIsDone, setDone, done }: Props) {
  const { groupId, taskListId } = useQueryParameter();
  const patchMutation = useTaskMutation(task, groupId, taskListId);

  return (
    <TooltipWrapper
      message={
        done ? (
          <>
            완료를 취소하시겠습니까?{'  '}
            <button
              type='button'
              onClick={() => {
                patchMutation.mutate({ done: false });

                setIsDone(false);
                setDone(false);
              }}
              className='text-brand-primary font-bold text-md'
            >
              취소
            </button>
          </>
        ) : (
          <span>해당 일정을 완료해보세요!</span>
        )
      }
      position='top-[-120%] right-0'
    >
      <FloatingButton
        onClick={() => {
          patchMutation.mutate({ done: true });
          setIsDone(true);
          setDone(true);
        }}
        disabled={done || patchMutation.isPending}
        text={done ? '완료됨' : '완료'}
        type='button'
        icon={done ? 'checkWhite' : 'checkGray'}
        className='w-fit '
      />
    </TooltipWrapper>
  );
}

export default DoneButton;
