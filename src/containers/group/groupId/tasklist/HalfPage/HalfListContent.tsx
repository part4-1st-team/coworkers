import {
  IconCalendar,
  IconKebabLarge,
  IconRepeat,
  IconX,
} from '@/assets/IconList';
import FloatingButton from '@/components/button/floatingButton';
import useQueryParameter from '@/hooks/useQueryParameter';
import useTaskCommentList from '@/hooks/useTaskCommentList';
import useHalfPageStore from '@/stores/HalfPageStore';
import getDaily from '@/utils/getDaily';
import getDate from '@/utils/getDate';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import EditDeleteDropdown from '../../EditDeleteDropdown';
import Comment from '../comment/Comment';
import CommentInput from '../comment/CommentInput';
import useDeleteTaskMutation from '../hooks/useDeleteTaskMutation';
import useTaskMutation from '../hooks/useTaskMutation';
import EditPencilButton from './EditPencilButton';

interface TitleEditForm {
  title: string;
}

function HalfPageContent({ task }: { task: DateTask }) {
  const { setHalfPageClose } = useHalfPageStore();

  const [isTitleEditing, setisTitleEditing] = useState<boolean>(false);

  const {
    id: taskId,
    name,
    description,
    date,
    // doneAt,
    updatedAt,
    frequency,
    // deletedAt,
    // commentCount,
    // displayIndex,
    writer,
    // doneBy,
  } = task;

  const { nickname } = writer;

  const { taskCommentList } = useTaskCommentList(taskId);

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
                <p className='text-text-primary text-xl font-bold h-45 flex items-center '>
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
              handleEdit={() => console.log('수정')}
              handleDelete={() => {
                deleteMutation.mutate();
                setHalfPageClose();
              }}
            />
          </div>
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-12'>
              <div className='w-32 h-32 rounded-[9999px] bg-white' />
              <span className='text-md font-medium text-text-primary'>
                {nickname}
              </span>
            </div>
            <span className='text-md font-normal text-text-secondary'>
              {getDate(updatedAt, true)}
            </span>
          </div>
          <div className='flex gap-10 items-center'>
            <div className='flex items-center gap-6'>
              <IconCalendar width={16} height={16} />
              <span className='text-text-default text-xs font-normal'>
                {getDate(date)}
              </span>
            </div>
            <div className='w-1 h-8 bg-background-tertiary rounded-4' />
            <div className='flex items-center gap-6'>
              <IconRepeat width={16} height={16} />
              <span className='text-text-default text-xs font-normal'>
                {getDaily(frequency)}
              </span>
            </div>
          </div>
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
        text='완료하기'
        type='button'
        icon='checkGray'
        className='w-fit absolute bottom-40 right-40'
      />
    </motion.div>
  );
}

export default HalfPageContent;
