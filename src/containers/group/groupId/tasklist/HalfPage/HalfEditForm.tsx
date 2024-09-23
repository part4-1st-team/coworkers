import Button from '@/components/button/button';
import useQueryParameter from '@/hooks/useQueryParameter';
import { SubmitHandler, useForm } from 'react-hook-form';
import useTaskMutation from '../hooks/useTaskMutation';
import HalfUserInfo from './HalfUserInfo';

interface HalfFormState {
  title: string;
  content: string;
}

interface Props {
  task: DateTask;
  handleCancelEdit: () => void;
}

function HalfEditForm({ task, handleCancelEdit }: Props) {
  const { name, description } = task;
  const { groupId, taskListId } = useQueryParameter();

  const { register, handleSubmit } = useForm<HalfFormState>({
    defaultValues: {
      title: name,
      content: description,
    },
  });

  const patchMutation = useTaskMutation(task, groupId, taskListId);
  const onEditSubmit: SubmitHandler<HalfFormState> = (data) => {
    const { title, content } = data;

    patchMutation.mutate({ name: title, description: content });
    handleCancelEdit();
  };

  // TODO UI 변경하기 (임시)
  return (
    <form
      onSubmit={handleSubmit(onEditSubmit)}
      className='flex flex-col gap-24'
    >
      <div className='flex flex-col gap-16'>
        <div className='flex justify-between'>
          <input
            {...register('title')}
            className='bg-background-primary rounded-8 h-45 w-fit text-text-secondary text-xl font-medium px-10 py-10'
          />
        </div>

        <HalfUserInfo task={task} />
      </div>
      <textarea
        {...register('content')}
        className='bg-background-primary rounded-8 h-200 w-full text-text-secondary text-md font-normal px-10 py-10 resize-none'
      />

      <div className='w-fit absolute bottom-60 right-50 flex gap-10'>
        <Button
          type='button'
          color='white'
          onClick={handleCancelEdit}
          className='w-100 h-40 text-sm'
        >
          취소
        </Button>
        <Button type='submit' color='primary' className='w-100 h-40 text-sm'>
          수정
        </Button>
      </div>
    </form>
  );
}

export default HalfEditForm;
