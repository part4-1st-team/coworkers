import useDropdown from '@/hooks/useDropdown';
import useModalStore from '@/stores/ModalStore';
import { useRouter } from 'next/router';
import Dropdown from '../dropdown/Dropdown';
import ProfileImage from '../member/ProfileImage';
import LogoutModal from '../modal/LogoutModal';

function UserDropdown({
  user,
  isLoggedIn,
}: {
  user: BasicUser | User | null
  isLoggedIn: boolean;
}) {
  const { handleOffDropdown, handleToggleDropdown, isOpen } = useDropdown();
  const router = useRouter();
  const { setModalOpen } = useModalStore();

  return (
    <Dropdown onClose={handleOffDropdown}>
      <Dropdown.Trigger onClick={handleToggleDropdown}>
        <div className='flex items-center gap-8 w-full'>
          {!isLoggedIn ? (
            <ProfileImage userImage={null} size={32} />
          ) : (
            <>
              <ProfileImage userImage={user?.image ?? null} size={32} />{' '}
              {/* user가 null일 경우 null로 설정 */}
              <div className='hidden tablet:inline-block'>
                {user?.nickname}
              </div>{' '}
              {/* user가 null일 경우 처리 */}
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
            onClick={() => router.push('/terms')}
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
