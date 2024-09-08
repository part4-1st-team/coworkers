/* eslint-disable jsx-a11y/click-events-have-key-events */

import { IconKebabSmall, IconKebabLarge } from '@/assets/IconList';

function ArticleCard() {
  return (
    <>
      {' '}
      <div className='block tablet:hidden tablet:h-220 pt-24 pb-16 px-16 bg-background-secondary rounded-12 border border-background-tertiary'>
        <div className='mt-10 flex justify-between'>
          <p className='w-224 text-lg text-text-secondary font-medium'>
            게시글 내용
          </p>
        </div>
        <p className='text-md text-text-disabled mt-12 flex items-center'>
          2024.07.25
        </p>
        <div className='mt-16 flex justify-between gap-12 '>
          <div className='flex items-center gap-12'>
            <div className='w-32 h-32 pb-12 rounded-[9999px] bg-white' />
            {/* TODO : 프로필 컴포넌트로 변경하기 */}
            <p className='text-text-primary text-md font-medium '>우지은</p>
            {/* TODO : 드롭다운 컴포넌트로 변경하기 */}
          </div>
          <div className='flex items-center gap-8'>
            <p className='text-md text-text-disabled flex items-center'>
              9999+
            </p>
            <IconKebabSmall />
          </div>
        </div>
      </div>
      {/* 테이블 사이즈 레이아웃 */}
      <div className='hidden tablet:block h-220 pt-24 pb-24 px-32 bg-background-secondary rounded-12 border border-background-tertiary'>
        <div className='flex flex-col justify-between h-full'>
          <div className='mt-10 flex justify-between'>
            <p className='w-224 text-lg text-text-secondary font-medium'>
              게시글 내용
            </p>
            <IconKebabLarge />
          </div>

          <div className='mt-16 flex justify-between gap-16 '>
            <div className='flex items-center gap-10'>
              <div className='w-32 h-32 pb-12 rounded-[9999px] bg-white' />
              {/* TODO : 프로필 컴포넌트로 변경하기 */}
              <p className='text-text-primary text-md font-medium '>우지은</p>
              <p className='text-md text-text-disabled '>2024.07.25</p>
            </div>

            <div className='flex items-center gap-8'>
              <p className='text-md text-text-disabled flex items-center'>
                9999+
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ArticleCard;
