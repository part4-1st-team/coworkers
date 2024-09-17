import {
  IconCalendar,
  IconKebabLarge,
  IconPencil,
  IconRepeat,
  IconTime,
  IconX,
} from '@/assets/IconList';
import FloatingButton from '@/components/button/floatingButton';
import useTaskCommentList from '@/hooks/useTaskCommentList';
import useHalfPageStore from '@/stores/HalfPageStore';
import getDaily from '@/utils/getDaily';
import getDate from '@/utils/getDate';
import getTime from '@/utils/getTime';
import { motion } from 'framer-motion';
import Comment from '../comment/Comment';
import CommentInput from '../comment/CommentInput';

function HalfPageContent({ task }: { task: DateTask }) {
  const { setHalfPageClose } = useHalfPageStore();

  const {
    id,
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

  const { taskCommentList } = useTaskCommentList(id);

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
            <div className='flex gap-12 items-center'>
              <span className='text-text-primary text-xl font-bold'>
                {name}
              </span>
              <IconPencil className='w-16 h-16 fill-text-default' />
              {/* TODO 제목 수정할 수 있는 로직 추가하기 */}
            </div>
            <IconKebabLarge />
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
              <IconTime width={16} height={16} />
              <span className='text-text-default text-xs font-normal'>
                {getTime(date)}
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
        <CommentInput taskId={id} />
        {taskCommentList.map((taskComment: Comment) => (
          <Comment comment={taskComment} key={taskComment.id} />
        ))}
      </div>
      <FloatingButton
        text='완료하기'
        type='button'
        icon='checkGray'
        className='w-fit absolute bottom-40 right-40'
      />
    </motion.div>
  );
}

export default HalfPageContent;
