import { IconMenu } from '@/assets/IconList';
import LogoLarge from '@/assets/images/img_logo_large.svg';
import LogoSmall from '@/assets/images/img_logo_small.svg';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useUserStore from '@/stores/userStore';
import HeaderGroupDropdown from './HeaderGroupDropdown';
import UserDropdown from './UserDropdown';
import SideMenu from '../sidemenu/SideMenu';

function Header() {
  const router = useRouter();
  const currentPath = router.pathname;
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const { user, isLoggedIn } = useUserStore();

  const toggleSideMenu = () => {
    setIsSideMenuOpen((prev) => !prev);
  };

  return (
    <div
      className='fixed inset-0 border-b dark:border-background-tertiary-dark z-header w-full h-60 bg-background-secondary 
    dark:bg-background-secondary-dark text-text-primary dark:text-text-primary-dark text-lg font-md px-16 tablet:px-24 flex items-center'
    >
      <div className='w-full desktop:w-1200 desktop:mx-auto flex'>
        <div className='flex items-center'>
          {isLoggedIn && (
            <IconMenu
              className='w-24 mr-16 tablet:hidden'
              onClick={toggleSideMenu}
            />
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
                <div className='hidden ml-32 tablet:flex items-center gap-40'>
                  <HeaderGroupDropdown />
                  <Link href='/board' className='desktop:ml-40'>
                    자유게시판
                  </Link>
                </div>
              )}
            </div>
            <UserDropdown user={user ?? null} />
          </div>
        )}
        {isSideMenuOpen && <SideMenu onClose={toggleSideMenu} />}
      </div>
    </div>
  );
}

export default Header;
