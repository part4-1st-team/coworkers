import useDropdown from '@/hooks/useDropdown';
import useModalStore from '@/stores/ModalStore';
import { useRouter } from 'next/router';
import useUserStore from '@/stores/userStore';
import Dropdown from '../dropdown/Dropdown';
import ProfileImage from '../member/ProfileImage';
import LogoutModal from '../modal/LogoutModal';

function UserDropdown({ user }: { user: User | null }) {
  const { handleOffDropdown, handleToggleDropdown, isOpen } = useDropdown();
  const router = useRouter();
  const { setModalOpen } = useModalStore();
  const { isLoggedIn } = useUserStore();

  return (
    <Dropdown onClose={handleOffDropdown}>
      <Dropdown.Trigger onClick={handleToggleDropdown}>
        <div className='flex items-center gap-8 w-full'>
          {!user ? (
            <ProfileImage userImage={null} size={32} />
          ) : (
            <>
              <ProfileImage userImage={user.image} size={32} />
              <div className='hidden tablet:inline-block'>{user.nickname}</div>
            </>
          )}
        </div>
      </Dropdown.Trigger>

      {!isLoggedIn ? (
        <Dropdown.Menu isOpen={isOpen} className='right-0 top-45'>
          <Dropdown.List
            onClick={() => router.push('/auth/signin')}
            onClose={handleOffDropdown}
          >
            로그인
          </Dropdown.List>
          <Dropdown.List
            onClick={() => router.push('/auth/signup')}
            onClose={handleOffDropdown}
          >
            회원가입
          </Dropdown.List>
        </Dropdown.Menu>
      ) : (
        <Dropdown.Menu isOpen={isOpen} className='right-0 top-45'>
          <Dropdown.List
            onClick={() => router.push('/group/join-group')}
            onClose={handleOffDropdown}
          >
            팀 참여하기
          </Dropdown.List>
          <Dropdown.List
            onClick={() => router.push('/groups')}
            onClose={handleOffDropdown}
          >
            그룹 리스트
          </Dropdown.List>
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
            onClick={() => setModalOpen(<LogoutModal />)}
            onClose={handleOffDropdown}
          >
            로그아웃
          </Dropdown.List>
        </Dropdown.Menu>
      )}
    </Dropdown>
  );
}

export default UserDropdown;
