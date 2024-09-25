import { IconKebabLarge, IconX } from '@/assets/IconList';
import FloatingButton from '@/components/button/floatingButton';
import TaskDeleteModal from '@/components/modal/TaskDeleteModal';
import useQueryParameter from '@/hooks/useQueryParameter';
import useTaskCommentList from '@/hooks/useTaskCommentList';
import useHalfPageStore from '@/stores/HalfPageStore';
import useModalStore from '@/stores/ModalStore';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import EditDeleteDropdown from '../../EditDeleteDropdown';
import Comment from '../comment/Comment';
import CommentInput from '../comment/CommentInput';
import useDeleteTaskMutation from '../hooks/useDeleteTaskMutation';
import useTaskMutation from '../hooks/useTaskMutation';
import EditPencilButton from './EditPencilButton';
import HalfEditForm from './HalfEditForm';
import HalfUserInfo from './HalfUserInfo';

interface TitleEditForm {
  title: string;
}

interface Props {
  task: DateTask;
  isDone: boolean;
}

function HalfPageContent({ task, isDone }: Props) {
  const { setHalfPageClose } = useHalfPageStore();

  const [isTitleEditing, setisTitleEditing] = useState<boolean>(false);
  const [isAllEditing, setIsAllEditing] = useState<boolean>(false);

  const { id: taskId, name, description, date } = task;

  const { taskCommentList } = useTaskCommentList(taskId);
  const { setModalOpen } = useModalStore();

  const { handleSubmit, register } = useForm<TitleEditForm>({
    mode: 'onSubmit',
    defaultValues: {
      title: name,
    },
  });

  const { groupId, taskListId } = useQueryParameter();
  const patchMutation = useTaskMutation(task, groupId, taskListId);
  const deleteMutation = useDeleteTaskMutation(
    groupId,
    taskListId,
    taskId,
    date,
  );

  const onTitleEditSubmit: SubmitHandler<TitleEditForm> = (data) => {
    const { title } = data;

    patchMutation.mutate({ name: title });
    setisTitleEditing(false);
  };

  useEffect(() => {
    return () => {
      setIsAllEditing(false);
      setisTitleEditing(false);
    };
  }, []);

  if (isAllEditing) {
    return (
      <motion.div
        initial={{ x: 300 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className='bg-background-secondary h-[96vh] w-full relative border-x border-background-tertiary pt-80 px-40 pb-40'
      >
        <button
          className='absolute top-40 left-40'
          type='button'
          onClick={setHalfPageClose}
          aria-label='페이지 닫기 버튼'
        >
          <IconX width={24} height={24} />
        </button>

        <HalfEditForm
          task={task}
          handleCancelEdit={() => setIsAllEditing(false)}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ x: 300 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className='bg-background-secondary h-[96vh] w-full relative border-x border-background-tertiary pt-80 px-40 pb-40'
    >
      <button
        className='absolute top-40 left-40'
        type='button'
        onClick={setHalfPageClose}
        aria-label='페이지 닫기 버튼'
      >
        <IconX width={24} height={24} />
      </button>

      <div className='flex flex-col gap-24'>
        <div className='flex flex-col gap-16'>
          <div className='flex justify-between items-center'>
            <form
              onSubmit={handleSubmit(onTitleEditSubmit)}
              className='flex gap-12 items-center'
            >
              {isTitleEditing ? (
                <input
                  {...register('title')}
                  className='bg-background-primary rounded-8 h-45 w-fit text-text-secondary text-xl font-medium px-10 py-10'
                />
              ) : (
                <p
                  className={clsx(
                    'text-text-primary text-xl font-bold h-45 flex items-center',
                    isDone && 'line-through',
                  )}
                >
                  {name}
                </p>
              )}
              <EditPencilButton
                isEditing={isTitleEditing}
                setIsEditing={setisTitleEditing}
              />
            </form>

            <EditDeleteDropdown
              trigger={<IconKebabLarge />}
              handleEdit={() => setIsAllEditing(true)}
              handleDelete={() => {
                setModalOpen(<TaskDeleteModal task={task} />);
                setHalfPageClose();
              }}
            />
          </div>
          <HalfUserInfo task={task} />
        </div>
        <div className='w-full h-200 text-md font-normal text-text-primary'>
          {description}
        </div>
        <CommentInput taskId={taskId} />
        {taskCommentList.map((taskComment: Comment) => (
          <Comment comment={taskComment} key={taskComment.id} />
        ))}
      </div>
      <FloatingButton
        onClick={() => patchMutation.mutate({ done: true })}
        disabled={isDone || patchMutation.isPending}
        text={isDone ? '완료됨' : '완료하기'}
        type='button'
        icon={isDone ? 'checkWhite' : 'checkGray'}
        className='w-fit absolute bottom-60 right-50'
      />
    </motion.div>
  );
}

export default HalfPageContent;
