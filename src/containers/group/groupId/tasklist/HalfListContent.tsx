import {
  IconCalendar,
  IconKebabLarge,
  IconPencil,
  IconRepeat,
  IconTime,
  IconX,
} from '@/assets/IconList';
import FloatingButton from '@/components/button/floatingButton';
import useHalfPageStore from '@/stores/HalfPageStore';
import { motion } from 'framer-motion';
import Comment from './comment/Comment';
import CommentInput from './comment/CommentInput';

function HalfPageContent() {
  const { setHalfPageClose } = useHalfPageStore();

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
        <IconX />
      </button>
      <div className='flex flex-col gap-24'>
        <div className='flex flex-col gap-16'>
          <div className='flex justify-between items-center'>
            <div className='flex gap-12 items-center'>
              <span className='text-text-primary text-xl font-bold'>
                법인 설립 비용 안내 드리기
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
                안해나
              </span>
            </div>
            <span className='text-md font-normal text-text-secondary'>
              2024.09.09
            </span>
          </div>
          <div className='flex gap-10 items-center'>
            <div className='flex items-center gap-6'>
              <IconCalendar width={16} height={16} />
              <span className='text-text-default text-xs font-normal'>
                2024년 7월 29일
              </span>
            </div>
            <div className='w-1 h-8 bg-background-tertiary rounded-4' />
            <div className='flex items-center gap-6'>
              <IconTime width={16} height={16} />
              <span className='text-text-default text-xs font-normal'>
                오후 3시 30분
              </span>
            </div>
            <div className='w-1 h-8 bg-background-tertiary rounded-4' />
            <div className='flex items-center gap-6'>
              <IconRepeat width={16} height={16} />
              <span className='text-text-default text-xs font-normal'>
                매일 반복
              </span>
            </div>
          </div>
        </div>
        <div className='w-full h-200 text-md font-normal text-text-primary'>
          필수 정보 10분 입력하면 어쩌구
        </div>
        <CommentInput />
        <Comment />
      </div>
      <FloatingButton type='complete' className='absolute bottom-40 right-40' />
    </motion.div>
  );
}

export default HalfPageContent;
