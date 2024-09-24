import Button from '@/components/button/button';
import Input from '@/components/input/input';
import useTaskMutation from '@/containers/group/groupId/tasklist/hooks/useTaskMutation';
import useQueryParameter from '@/hooks/useQueryParameter';
import useModalStore from '@/stores/ModalStore';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import BoxInput from '../input/boxInput';
import Modal from './Modal';

interface FormState {
  title: string;
  memo: string;
}

function TaskEditModal({ task }: { task: DateTask }) {
  const { name, description } = task;

  const { handleSubmit, control } = useForm<FormState>({
    defaultValues: {
      title: name,
      memo: description,
    },
  });

  const { setModalClose } = useModalStore();

  const { groupId, taskListId } = useQueryParameter();
  const taskPatchMutation = useTaskMutation(task, groupId, taskListId);

  const handleTaskEdit: SubmitHandler<FormState> = (data) => {
    const { title, memo } = data;
    const newData: PatchTask = { name: title, description: memo };
    taskPatchMutation.mutate(newData);
    setModalClose();
  };

  return (
    <Modal.Close>
      <form
        onSubmit={handleSubmit(handleTaskEdit)}
        className='pt-32 px-36 flex flex-col items-center'
      >
        <div className='mb-24 w-full'>
          <div className='flex flex-col items-center text-center'>
            <Modal.Title title='할 일 수정하기' />
            <Modal.Description description='할 일은 실제로 행동 가능한 작업 중심으로<br/>작성해주시면 좋습니다.' />
          </div>
          <div className='my-16'>
            <span className='text-lg font-medium text-white '>할 일 제목</span>

            <Controller
              name='title'
              control={control}
              render={({ field }) => (
                <Input
                  placeholder='할 일 제목을 입력해주세요.'
                  {...field}
                  className='w-full h-48 tablet:min-w-280 mt-8'
                />
              )}
            />
          </div>

          <div>
            <span className='text-lg font-medium text-white mb-8'>
              할 일 메모
            </span>

            <Controller
              name='memo'
              control={control}
              render={({ field }) => (
                <BoxInput
                  className='border-background-tertiary mt-8'
                  placeholder='메모를 입력해주세요.'
                  {...field}
                />
              )}
            />
          </div>
        </div>

        <Button type='submit' className='w-full' color='primary'>
          수정하기
        </Button>
      </form>
    </Modal.Close>
  );
}

export default TaskEditModal;
