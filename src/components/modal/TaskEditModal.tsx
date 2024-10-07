import Button from '@/components/button/button';
import Input from '@/components/input/input';
import useTaskMutation from '@/containers/group/groupId/tasklist/hooks/useTaskMutation';
import useModalStore from '@/stores/ModalStore';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import FormFieldSet from '../form/FormFieldset';
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

  const router = useRouter();
  const { groupId, taskListId } = router.query;

  const taskPatchMutation = useTaskMutation(
    task,
    Number(groupId),
    Number(taskListId),
  );

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
        <div className='mb-24 w-full space-y-24'>
          <div className='flex flex-col items-center text-center'>
            <Modal.Title title='할 일 수정하기' />
            <Modal.Description description='할 일은 실제로 행동 가능한 작업 중심으로<br/>작성해주시면 좋습니다.' />
          </div>
          <FormFieldSet id='title' label='할 일 제목'>
            <Controller
              name='title'
              control={control}
              render={({ field }) => (
                <Input
                  placeholder='할 일 제목을 입력해주세요.'
                  {...field}
                  className='w-full h-48 tablet:min-w-280'
                />
              )}
            />
          </FormFieldSet>
          <FormFieldSet id='memo' label='할 일 메모'>
            <Controller
              name='memo'
              control={control}
              render={({ field }) => (
                <BoxInput
                  className='border-background-tertiary'
                  placeholder='메모를 입력해주세요.'
                  {...field}
                />
              )}
            />
          </FormFieldSet>
        </div>

        <Button type='submit' className='w-full' color='primary'>
          수정하기
        </Button>
      </form>
    </Modal.Close>
  );
}

export default TaskEditModal;
