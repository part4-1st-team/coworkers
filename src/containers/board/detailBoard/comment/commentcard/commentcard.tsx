import { IconKebabSmall, IconHeart } from '@/assets/IconList';

function CommentCard() {
  return (
    <div className='pt-24 pb-24 px-32 bg-background-secondary rounded-12 border border-background-tertiary'>
      <div className='flex flex-col justify-between h-full'>
        <div className='mt-10 flex justify-between'>
          <p className='w-224 text-lg text-text-secondary font-medium'>
            게시글 내용
          </p>
          <IconKebabSmall />
        </div>
        <div className='mt-32 flex justify-between gap-16 '>
          <div className='flex items-center gap-10'>
            <div className='w-32 h-32 pb-12 rounded-[9999px] bg-white' />
            {/* TODO : 프로필 컴포넌트로 변경하기 */}
            <p className='text-text-primary text-md font-medium '>우지은</p>
            <div className='h-12 border border-background-tertiary' />
            <p className='text-md text-text-disabled '>2024.07.25</p>
          </div>
          <div className='tablet:hidden flex items-center gap-8'>
            <IconHeart />
            <p className='text-md text-text-disabled flex items-center'>
              9999+
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
