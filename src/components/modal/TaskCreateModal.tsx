import { postTaskList } from '@/services/TaskListAPI';
import useModalStore from '@/stores/ModalStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Button from '../button/button';
import Input from '../input/input';

import Modal from './Modal';
import ModalTitle from './ModalTitle';

interface FormState {
  list: string;
}

function TaskCreateModal({ groupId }: { groupId: number }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormState>();
  const { setModalClose } = useModalStore();

  const queryClient = useQueryClient();

  const postTaskMutation = useMutation({
    mutationFn: (name: string) => postTaskList(groupId, name),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getTaskLists', groupId],
      });
      setModalClose();
    },
    onError: () => {},
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
          <ModalTitle title='할 일 목록' />
          <Controller
            name='list'
            control={control}
            rules={{
              required: '목록 명을 입력해주세요.',
              maxLength: {
                value: 29,
                message: '목록 명은 29글자를 넘어갈 수 없습니다.',
              },
            }}
            render={({ field }) => (
              <>
                <Input
                  placeholder='목록 명을 입력해주세요'
                  {...field}
                  className='w-full h-48 mb-12'
                />
                {errors.list && (
                  <div className='absolute text-status-danger text-sm mt-90'>
                    {errors.list.message}
                  </div>
                )}
              </>
            )}
          />
        </div>

        <Button type='submit' className='w-full' color='primary'>
          만들기
        </Button>
      </form>
    </Modal.Close>
  );
}

export default TaskCreateModal;
