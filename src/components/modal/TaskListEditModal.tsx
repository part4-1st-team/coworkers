import { patchTaskLists } from '@/services/TaskListAPI';
import useModalStore from '@/stores/ModalStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import useToast from '@/components/toast/useToast';
import Button from '../button/button';
import Input from '../input/input';

import Modal from './Modal';
import ModalTitle from './ModalTitle';

interface FormState {
  list: string;
}

function TaskListEditModal({
  groupId,
  taskListId,
  taskListName,
}: {
  groupId: number;
  taskListId: number;
  taskListName: string;
}) {
  const { handleSubmit, control } = useForm<FormState>();
  const { setModalClose } = useModalStore();
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const postTaskMutation = useMutation({
    mutationFn: (name: string) => patchTaskLists(groupId, taskListId, name),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getTaskLists', groupId],
      });
      toast('Success', '목록이 성공적으로 수정되었습니다.');
      setModalClose();
    },
    onError: () => {
      toast('Error', '목록을 수정하는데 실패했습니다.');
    },
  });

  const onSubmit: SubmitHandler<FormState> = (data) => {
    const { list } = data;

    postTaskMutation.mutate(list);
  };

  return (
    <Modal.Close>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='px-36 pt-32 flex flex-col gap-24 items-center w-full'
      >
        <div className='flex flex-col items-center gap-16 w-full'>
          <ModalTitle title={taskListName} />
          <Controller
            name='list'
            control={control}
            render={({ field }) => (
              <Input
                placeholder='수정할 이름을 입력해주세요'
                {...field}
                className='w-full h-48'
              />
            )}
          />
        </div>

        <Button type='submit' className='w-full' color='primary'>
          수정하기
        </Button>
      </form>
    </Modal.Close>
  );
}

export default TaskListEditModal;
