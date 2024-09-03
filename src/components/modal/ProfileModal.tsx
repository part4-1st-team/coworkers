import CloseWrapper from './CloseWrapper';
import ModalPortal from './ModalPortal';

function ProfileModal({ member }: { member: IMember }) {
  // const { userImage, userName, userEmail } = member;
  const { userName, userEmail } = member;

  const handleEmailCopy = () => {
    // NOTE: 이메일 카피하는 기능 추가
  };

  return (
    <ModalPortal>
      <CloseWrapper>
        <div className='px-[16px] pt-[32px] flex flex-col items-center gap-[24px]'>
          <div className='w-[52px] h-[52px] rounded-[9999px] bg-white' />
          {/* TODO : 프로필 컴포넌트로 변경하기 */}
          <div className='text-center'>
            <p className='text-text-primary text-md font-medium mb-[8px]'>
              {userName}
            </p>
            <p className='text-text-secondary text-xs font-normal '>
              {userEmail}
            </p>
          </div>

          <button
            type='button'
            onClick={handleEmailCopy}
            className='bg-brand-primary text-white rounded-[12px] w-[280px] h-[47px]'
          >
            이메일 복사하기
          </button>
          {/* TODO : 버튼 컴포넌트로 변경하기 */}
        </div>
      </CloseWrapper>
    </ModalPortal>
  );
}

export default ProfileModal;
