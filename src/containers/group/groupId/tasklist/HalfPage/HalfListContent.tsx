import { IconKebabLarge, IconX } from '@/assets/IconList';
import FloatingButton from '@/components/button/floatingButton';
import TaskDeleteModal from '@/components/modal/TaskDeleteModal';
import useQueryParameter from '@/hooks/useQueryParameter';
import useTaskCommentList from '@/hooks/useTaskCommentList';
import useHalfPageStore from '@/stores/HalfPageStore';
import useModalStore from '@/stores/ModalStore';
import useUserStore from '@/stores/userStore';
import clsx from 'clsx';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import EditDeleteDropdown from '../../EditDeleteDropdown';
import Comment from '../comment/Comment';
import CommentInput from '../comment/CommentInput';
import useTaskMutation from '../hooks/useTaskMutation';
import DoneButton from './DoneButton';
import EditPencilButton from './EditPencilButton';
import HalfEditForm from './HalfEditForm';
import HalfUserInfo from './HalfUserInfo';

interface TitleEditForm {
  title: string;
}

interface Props {
  task: DateTask;
  isDone: boolean;
  setIsDone: Dispatch<SetStateAction<boolean>>;
}

function HalfPageContent({ task, isDone, setIsDone }: Props) {
  const { setHalfPageClose } = useHalfPageStore();

  const [isTitleEditing, setisTitleEditing] = useState<boolean>(false);
  const [isAllEditing, setIsAllEditing] = useState<boolean>(false);

  const { id: taskId, name, description, date, writer } = task;
  const { id: writerId } = writer;

  const [title, setTitle] = useState<string>(name);
  const [content, setContent] = useState<string>(description);
  const [done, setDone] = useState<boolean>(isDone);

  const { taskCommentList } = useTaskCommentList(taskId);
  const { setModalOpen } = useModalStore();
  const { user: currentUser } = useUserStore();

  const { handleSubmit, register } = useForm<TitleEditForm>({
    mode: 'onSubmit',
    defaultValues: {
      title,
    },
  });

  const { groupId, taskListId } = useQueryParameter();
  const patchMutation = useTaskMutation(task, groupId, taskListId);

  const onTitleEditSubmit: SubmitHandler<TitleEditForm> = (data) => {
    const { title: dataTitle } = data;

    patchMutation.mutate({ name: dataTitle });
    setisTitleEditing(false);
    setTitle(dataTitle);
  };

  useEffect(() => {
    return () => {
      setIsAllEditing(false);
      setisTitleEditing(false);
    };
  }, []);

  if (!currentUser) return null;

  if (isAllEditing) {
    return (
      <section
        className={clsx(
          'h-[96vh] w-full relative border-x pt-80 px-40 pb-40',
          'bg-background-secondary dark:bg-background-secondary-dark border-border-primary dark:border-border-primary-dark',
        )}
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
          title={title}
          content={content}
          setTitle={setTitle}
          setContent={setContent}
          handleCancelEdit={() => setIsAllEditing(false)}
        />
      </section>
    );
  }

  return (
    <section
      className={clsx(
        'h-[96vh] w-full relative border-x pt-80 px-40 pb-40 overflow-y-auto',
        'bg-background-secondary dark:bg-background-secondary-dark border-border-primary dark:border-border-primary-dark',
      )}
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
                  className='bg-background-primary dark:bg-background-primary-dark rounded-8 h-45 w-fit text-text-secondary dark:text-text-secondary-dark text-xl font-medium px-10 py-10'
                />
              ) : (
                <p
                  className={clsx(
                    'text-text-primary dark:text-text-primary-dark text-xl font-bold h-45 flex items-center',
                    done && 'line-through',
                  )}
                >
                  {title}
                </p>
              )}
              {currentUser.id === writerId && (
                <EditPencilButton
                  isEditing={isTitleEditing}
                  setIsEditing={setisTitleEditing}
                />
              )}
            </form>

            {currentUser.id === writerId && (
              <EditDeleteDropdown
                trigger={<IconKebabLarge />}
                handleEdit={() => setIsAllEditing(true)}
                handleDelete={() =>
                  setModalOpen(<TaskDeleteModal task={task} />)
                }
              />
            )}
          </div>
          <HalfUserInfo task={task} />
        </div>
        <div className='whitespace-pre-wrap w-full h-200 text-md font-normal text-text-primary dark:text-text-primary-dark'>
          {content}
        </div>
        <CommentInput taskId={taskId} />
        {taskCommentList.map((taskComment: Comment) => (
          <Comment comment={taskComment} key={taskComment.id} />
        ))}
      </div>
      <div className='absolute bottom-60 right-50'>
        <DoneButton
          setIsDone={setIsDone}
          setDone={setDone}
          done={done}
          task={task}
        />
      </div>
    </section>
  );
}

export default HalfPageContent;
