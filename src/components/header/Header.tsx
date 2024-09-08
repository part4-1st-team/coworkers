import Link from 'next/link';
import { IconUser, IconCheck, IconMenu } from '@/assets/IconList';
import LogoLarge from '@/assets/images/img_logo_large.svg';
import LogoSmall from '@/assets/images/img_logo_small.svg';

function Header() {
  // TODO 반응형 작업 랜딩 페이지에서 메뉴 숨기기 -> 페이지 위치 받기
  return (
    <div className='w-full h-[60px] bg-background-secondary text-text-primary font-md px-[16px] tablet:px-[24px] flex items-center'>
      <div className='w-full desktop:w-[1200px] desktop:mx-auto flex justify-between'>
        <section className='flex items-center '>
          <div className='flex items-center'>
            <IconMenu className='w=[24px] mr-[16px]  tablet:hidden' />
            <LogoSmall className='desktop:hidden fill-brand-primary' />
            <LogoLarge className='hidden desktop:block fill-brand-primary' />
          </div>
          <div className='hidden tablet:block ml-[32px] tablet:flex items-center gap-[11px]'>
            <button type='button' className='flex items-center gap-[11px]'>
              <div>경영관리팀</div>
              <IconCheck className='fill-text-inverse' />
              {/* TODO -드롭다운 컴포넌트로 수정, 토글 화살표 아이콘 폴더에 추가 */}
            </button>
            <Link href='/board'>자유게시판</Link>
          </div>
        </section>
        <section className='flex items-center '>
          <Link
            href='/user/account-setting'
            className='flex items-center gap-[8px]'
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
