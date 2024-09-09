import { IconHeart, IconComment } from '@/assets/IconList';
import BoxInput from '@/components/input/boxInput';
import Button from '@/components/button/button';

function DetailContent() {
  return (
    <div>
      <div className='text-lg font-medium tablet:text-2lg text-text-secondary'>
        게시물 제목 영역입니다.
      </div>
      {/* TODO : 제목 데이터 받아 수정하기 */}

      <div className='mt-16 w-full border-t border-border-primary' />

      <div className='mt-16 flex justify-between gap-16 '>
        <div className='flex items-center gap-10'>
          <div className='w-32 h-32 pb-12 rounded-[9999px] bg-white' />
          {/* TODO : 프로필 컴포넌트로 변경하기 */}
          <p className='text-text-primary text-md font-medium '>우지은</p>
          <div className='h-12 border border-background-tertiary' />
          <p className='text-md text-text-disabled '>2024.07.25</p>
        </div>

        <div className='flex items-center gap-16'>
          <div className='flex gap-4'>
            <IconComment />
            <p className='text-md text-text-disabled flex items-center'>3</p>
          </div>

          <div className='flex items-center gap-4'>
            <IconHeart />
            <p className='text-md text-text-disabled flex items-center'>
              9999+
            </p>
          </div>
        </div>
      </div>
      <div className='mt-48 py-10 text-md font-normal text-text-secondary'>
        <p>
          본문이 들어가는 영역입니다. 본문이 들어가는 영역입니다. 본문이
          들어가는 영역입니다. 본문이 들어가는 영역입니다. 본문이 들어가는
          영역입니다. 본문이 들어가는 영역입니다. 본문이 들어가는 영역입니다.
          본문이 들어가는 영역입니다. 본문이 들어가는 영역입니다.
        </p>
      </div>
      <div className='mt-80 flex flex-col gap-16 tablet:gap-24'>
        <p className='text-lg font-medium tablet:text-xl  tablet:font-bold text-text-primary'>
          댓글달기
        </p>
        <BoxInput placeholder='댓글을 입력해주세요.' />
        <div className='flex justify-end'>
          <Button
            type='button'
            color='primary'
            className='w-74 h-32 tablet:w-184 tablet:h-48'
          >
            등록
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DetailContent;
