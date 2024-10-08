import { IconMenu } from '@/assets/IconList';
import LogoLarge from '@/assets/images/img_logo_large.svg';
import LogoSmall from '@/assets/images/img_logo_small.svg';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useUserStore from '@/stores/userStore';
import HeaderGroupDropdown from './HeaderGroupDropdown';
import UserDropdown from './UserDropdown';
import SideMenu from '../sidemenu/SideMenu';
import useMemberships from '@/hooks/useMemberships';
import useGroups from '@/hooks/useGroups';
import ThemeSwitch from '../switch/ThemeSwitch';
import useUser from '@/hooks/useUser';

function Header() {
  const router = useRouter();
  const currentPath = router.pathname;
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const { user, refetch: refetchUser } = useUser();
  const { isLoggedIn } = useUserStore();
  const { memberships, refetch: refetchMemberships } = useMemberships();
  const { groups, refetch: refetchGroups } = useGroups();

  const toggleSideMenu = () => {
    setIsSideMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isLoggedIn) {
      // 새로 로그인 했을 때 memberships와 groups를 재요청
      refetchMemberships();
      refetchGroups();
      refetchUser();
    }
  }, [isLoggedIn, refetchMemberships, refetchGroups, refetchUser]);

  return (
    <div
      className='fixed inset-0 border-b dark:border-background-tertiary-dark z-header w-full h-60 bg-background-secondary 
    dark:bg-background-secondary-dark text-text-primary dark:text-text-primary-dark text-lg font-md px-16 tablet:px-24 flex items-center'
    >
      <div className='w-full desktop:w-1200 desktop:mx-auto flex justify-between itens-center'>
        <div className='flex items-center'>
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
                  <div className='hidden ml-32 tablet:flex items-center gap-28 desktop:gap-32'>
                    <HeaderGroupDropdown
                      memberships={memberships}
                      groups={groups}
                    />
                    <Link href='/groups'>내 팀 목록</Link>
                    <Link href='/board'>자유게시판</Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className='flex items-center gap-12'>
          <ThemeSwitch />
          <UserDropdown user={user} isLoggedIn={isLoggedIn} />
        </div>
        {isSideMenuOpen && <SideMenu onClose={toggleSideMenu} />}
      </div>
    </div>
  );
}

export default Header;
