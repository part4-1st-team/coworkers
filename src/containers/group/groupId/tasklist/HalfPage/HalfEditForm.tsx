import Button from '@/components/button/button';
import useQueryParameter from '@/hooks/useQueryParameter';
import { Dispatch, SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useTaskMutation from '../hooks/useTaskMutation';
import HalfUserInfo from './HalfUserInfo';

interface HalfFormState {
  dataTitle: string;
  dataContent: string;
}

interface Props {
  task: DateTask;
  handleCancelEdit: () => void;
  title: string;
  content: string;
  setTitle: Dispatch<SetStateAction<string>>;
  setContent: Dispatch<SetStateAction<string>>;
}

function HalfEditForm({
  task,
  handleCancelEdit,
  setTitle,
  setContent,
  title,
  content,
}: Props) {
  const { name, description } = task;
  const { groupId, taskListId } = useQueryParameter();

  const { register, handleSubmit } = useForm<HalfFormState>({
    defaultValues: {
      dataTitle: title,
      dataContent: content,
    },
  });

  const patchMutation = useTaskMutation(task, groupId, taskListId);
  const onEditSubmit: SubmitHandler<HalfFormState> = (data) => {
    const { dataTitle, dataContent } = data;

    patchMutation.mutate({ name: dataTitle, description: dataContent });
    setTitle(title);
    setContent(content);
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
            {...register('dataTitle')}
            className='bg-background-primary dark:bg-background-primary-dark rounded-8 h-45 w-fit text-text-secondary dark:text-text-secondary-dark text-xl font-medium px-10 py-10'
          />
        </div>

        <HalfUserInfo task={task} />
      </div>
      <textarea
        {...register('dataContent')}
        className='bg-background-primary dark:bg-background-primary-dark rounded-8 h-200 w-full text-text-secondary dark:text-text-secondary-dark text-md font-normal px-10 py-10 resize-none'
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
