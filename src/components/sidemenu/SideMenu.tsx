import { IconX } from '@/assets/IconList';
import Link from 'next/link';

function SideMenu() {
  return (
    <div>
      <section className='w-[204px] h-[100vh] bg-background-secondary'>
        <div className='p-[16px] flex flex-col gap-[32px]'>
          <button type='button' className='w-[100%] flex flex-row-reverse'>
            {/* TODO 닫기 기능 구현 */}
            <IconX />
          </button>
          <div className='flex flex-col gap-[24px] text-white text-[14px] font-[500]'>
            {/* TODO 데이터 연동에 따라 목록 갱신 */}
            <Link href='/' className='h-[24px]'>
              경영관리팀
            </Link>
            <Link href='/' className='h-[24px]'>
              프로덕트팀
            </Link>
            <Link href='/' className='h-[24px]'>
              마케팅팀
            </Link>
            <Link href='/' className='h-[24px]'>
              콘텐츠팀
            </Link>
            <Link href='/board' className='h-[24px]'>
              자유게시판
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SideMenu;
