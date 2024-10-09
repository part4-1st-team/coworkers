import { IconMenu } from '@/assets/IconList';
import LogoLarge from '@/assets/images/img_logo_large.svg';
import LogoSmall from '@/assets/images/img_logo_small.svg';
import useUser from '@/hooks/useUser';
import useUserStore from '@/stores/userStore';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import SideMenu from '../sidemenu/SideMenu';
import HeaderGroupDropdown from './HeaderGroupDropdown';
import UserDropdown from './UserDropdown';

function Header() {
  const router = useRouter();
  const currentPath = router.pathname;
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const { user: storeUser, isLoggedIn } = useUserStore();
  const { user } = useUser();

  const toggleSideMenu = () => {
    setIsSideMenuOpen((prev) => !prev);
  };

  return (
    <div
      className='fixed inset-0 border-b border-border-primary shadow-sm dark:border-background-tertiary-dark z-header w-full h-60 bg-background-secondary 
    dark:bg-background-secondary-dark text-text-primary dark:text-text-primary-dark text-lg font-md px-16 tablet:px-24 flex items-center'
    >
      <div className='w-full desktop:w-1200 desktop:mx-auto flex justify-between itens-center'>
        <div className='flex items-center'>
          <div className='flex items-center'>
            {isLoggedIn && (
              <button
                type='button'
                onClick={toggleSideMenu}
                className='w-24 mr-16 tablet:hidden'
                aria-label='사이드 메뉴 오픈 토글 버튼'
              >
                <IconMenu />
              </button>
            )}
            <Link href='/'>
              <LogoSmall className='desktop:hidden fill-brand-primary' />
              <LogoLarge className='hidden desktop:block fill-brand-primary' />
            </Link>
          </div>
          {currentPath.includes('auth') ? (
            <div> </div>
          ) : (
            <div className='w-full flex justify-between items-center'>
              <div className='flex items-center '>
                {isLoggedIn && (
                  <div className='hidden ml-32 tablet:flex items-center gap-28 desktop:gap-32'>
                    <HeaderGroupDropdown />
                    <Link href='/groups'>내 팀 목록</Link>
                    <Link href='/board'>자유게시판</Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div>
          <UserDropdown user={storeUser === null ? null : (user ?? null)} />
        </div>
        {isSideMenuOpen && <SideMenu onClose={toggleSideMenu} />}
      </div>
    </div>
  );
}

export default Header;
