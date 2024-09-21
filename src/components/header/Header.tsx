import { IconMenu } from '@/assets/IconList';
import LogoLarge from '@/assets/images/img_logo_large.svg';
import LogoSmall from '@/assets/images/img_logo_small.svg';
import Link from 'next/link';
import { useRouter } from 'next/router';
import HeaderGroupDropdown from './HeaderGroupDropdown';
import UserDropdown from './UserDropdown';

function Header() {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <div className='fixed top-0 left-0 z-header w-full h-60 bg-background-secondary text-text-primary text-lg font-md px-16 tablet:px-24 flex items-center'>
      <div className='w-full desktop:w-1200 desktop:mx-auto flex'>
        <div className='flex items-center'>
          <IconMenu className='w=24 mr-16  tablet:hidden' />

          <Link href='/'>
            <LogoSmall className='desktop:hidden fill-brand-primary' />
            <LogoLarge className='hidden desktop:block fill-brand-primary' />
          </Link>
        </div>
        {currentPath.includes('auth') || currentPath.includes('landing') ? (
          <div> </div>
        ) : (
          <div className='w-full flex justify-between items-center'>
            <div className='flex items-center '>
              <div className='hidden ml-32 tablet:flex items-center gap-40'>
                <HeaderGroupDropdown />

                <Link href='/board' className='desktop:ml-40'>
                  자유게시판
                </Link>
              </div>
            </div>
            <UserDropdown />
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
