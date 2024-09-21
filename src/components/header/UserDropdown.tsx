import { IconUser } from '@/assets/IconList';
import useDropdown from '@/hooks/useDropdown';
import useUser from '@/hooks/useUser';
import useUserStore from '@/stores/userStore';
import { useRouter } from 'next/router';
import Dropdown from '../dropdown/Dropdown';
import ProfileImage from '../member/ProfileImage';

function UserDropdown() {
  const { handleOffDropdown, handleToggleDropdown, isOpen } = useDropdown();

  const { user } = useUser();
  const { setLogout } = useUserStore();
  const router = useRouter();

  if (!user) return null;
  const { nickname, image } = user;

  return (
    <Dropdown onClose={handleOffDropdown}>
      <Dropdown.Trigger onClick={handleToggleDropdown}>
        <div className='flex items-center gap-8 w-full'>
          <ProfileImage userImage={image} size={32} />
          <div className='hidden tablet:inline-block'>{nickname}</div>
        </div>
      </Dropdown.Trigger>
      <Dropdown.Menu isOpen={isOpen} className='right-0 top-45'>
        <Dropdown.List
          onClick={() => router.push('/user/my-history')}
          onClose={handleOffDropdown}
        >
          마이 히스토리
        </Dropdown.List>
        <Dropdown.List
          onClick={() => router.push('/user/account-setting')}
          onClose={handleOffDropdown}
        >
          계정 설정
        </Dropdown.List>
        <Dropdown.List
          onClick={() => {
            setLogout();
            router.push('/');
          }}
          onClose={handleOffDropdown}
        >
          로그아웃
        </Dropdown.List>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default UserDropdown;
