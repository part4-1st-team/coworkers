import Link from 'next/link';
import { IconUser, IconCheck, IconMenu } from '@/assets/IconList';
import LogoLarge from '@/assets/images/img_logo_large.svg';
import LogoSmall from '@/assets/images/img_logo_small.svg';
import { useRouter } from 'next/router';
import { getUser } from '@/services/userAPI';
import { useEffect, useState } from 'react';

function Header() {
  const router = useRouter();
  const currentPath = router.pathname;
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [membershipsCount, setMembershipsCount] = useState<number>(0);

  function checkMemberships() {
    getUser()
      .then((user) => {
        setMembershipsCount(user.memberships.length);
      })
      .catch((error) => {
        console.error('Failed to fetch user data:', error);
      });
  }

  useEffect(() => {
    const atoken = localStorage.getItem('accessToken');
    const rtoken = localStorage.getItem('refreshToken');
    setAccessToken(atoken);
    setRefreshToken(rtoken);
    if (atoken) {
      checkMemberships();
    }
  }, [accessToken]);

  return (
    <div className='w-full h-60 bg-background-secondary text-text-primary text-lg font-md px-16 tablet:px-24 flex items-center'>
      <div className='w-full desktop:w-1200 desktop:mx-auto flex'>
        <div className='flex items-center'>
          {membershipsCount === 0 ? (
            <div> </div>
          ) : (
            <IconMenu className='w=24 mr-16  tablet:hidden' />
          )}
          {/* NOTE 차후 landing 페이지로 수정 */}
          <Link href='/group/77'>
            <LogoSmall className='desktop:hidden fill-brand-primary' />
            <LogoLarge className='hidden desktop:block fill-brand-primary' />
          </Link>
        </div>
        {currentPath.includes('auth') || currentPath.includes('landing') ? (
          <div> </div>
        ) : (
          <div className='w-full flex justify-between'>
            <div className='flex items-center '>
              <div className='hidden ml-32 tablet:flex items-center gap-11'>
                {membershipsCount === 0 ? (
                  <div> </div>
                ) : (
                  <button
                    type='button'
                    className='flex items-center gap-11 mr-32'
                  >
                    <div>경영관리팀</div>
                    {/* TODO 드롭다운 아이콘 수정 */}
                    <IconCheck className='fill-text-inverse' />
                    {/* TODO 드롭다운 컴포넌트로 수정 */}
                  </button>
                )}

                <Link href='/board' className='desktop:ml-40'>
                  자유게시판
                </Link>
              </div>
            </div>
            <div className='flex items-center '>
              <Link
                href='/user/account-setting'
                className='flex items-center gap-8'
              >
                <IconUser className='fill-text-inverse stroke-text-inverse' />
                <div className='hidden tablet:inline-block'>마이페이지</div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
