import Link from 'next/link';
import { IconUser, IconCheck, IconMenu } from '@/assets/IconList';
import LogoLarge from '@/assets/images/img_logo_large.svg';
import LogoSmall from '@/assets/images/img_logo_small.svg';

function Header() {
  // TODO 랜딩 페이지에서 메뉴 숨기기 -> 페이지 위치 받기
  return (
    <div className='w-full h-60 bg-background-secondary text-text-primary text-lg font-md px-16 tablet:px-24 flex items-center'>
      <div className='w-full desktop:w-1200 desktop:mx-auto flex justify-between'>
        <section className='flex items-center '>
          <div className='flex items-center'>
            <IconMenu className='w=24 mr-16  tablet:hidden' />
            <LogoSmall className='desktop:hidden fill-brand-primary' />
            <LogoLarge className='hidden desktop:block fill-brand-primary' />
          </div>
          <div className='hidden ml-32 tablet:flex items-center gap-11'>
            <button type='button' className='flex items-center gap-11'>
              <div>경영관리팀</div>
              {/* TODO 드롭다운 아이콘 수정 */}
              <IconCheck className='fill-text-inverse' />
              {/* TODO 드롭다운 컴포넌트로 수정 */}
            </button>
            <Link href='/board' className='ml-40'>
              자유게시판
            </Link>
          </div>
        </section>
        <section className='flex items-center '>
          <Link
            href='/user/account-setting'
            className='flex items-center gap-8'
          >
            <IconUser className='fill-text-inverse stroke-text-inverse' />
            <div className='hidden tablet:inline-block'>마이페이지</div>
          </Link>
        </section>
      </div>
    </div>
  );
}

export default Header;
