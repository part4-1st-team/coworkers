import Link from 'next/link';
import { IconUser, IconToggleDown, IconList } from '@/assets/IconList';
import LogoLarge from '../../../public/images/img_logo_large.svg';

function Header() {
  /**
   * TODO
   * 반응형 작업
   * 랜딩 페이지에서 메뉴 숨기기 -> 페이지 위치 받기
   */
  return (
    <div>
      <section className='w-[100%] h-[60px] bg-background-secondary text-white text-[16px] font-[500]'>
        <div className='w-[1200px] h-[100%] mx-[auto] flex items-center'>
          <IconList className='w=[24px] mr-[16px]' />
          {/**TODO
           * 반응형 작업-모바일에서만 적용
           *
           */}
          <LogoLarge />
          <div className='w-[960px] ml-[40px] flex items-center justify-between'>
            <section className='flex items-center gap-[40px] '>
              <div className='flex items-center gap-[11px]'>
                <button className='flex items-center gap-[11px]'>
                  <div>경영관리팀</div>
                  <IconToggleDown className='fill-text-inverse' />
                  {/*TODO
                   * -드롭다운 컴포넌트로 수정
                   * -토글 화살표 아이콘 폴더에 추가
                   */}
                </button>
              </div>
              <Link href='/board'>자유게시판</Link>
            </section>
            <section>
              <Link
                href='/user/account-setting'
                className='flex items-center gap-[8px]'
              >
                <IconUser className='fill-text-inverse stroke-text-inverse' />
                마이페이지
              </Link>
              {/*TODO 사용자에 따라 이름 변경*/}
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Header;
