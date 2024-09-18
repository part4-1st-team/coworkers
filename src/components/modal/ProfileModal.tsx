import Button from '@/components/button/button';
import MemberInfo from '../member/MemberInfo';
import Modal from './Modal';

function ProfileModal({ member }: { member: IMember }) {
  // const { userImage, userName, userEmail } = member;
  const { userName, userEmail } = member;

  const handleEmailCopy = () => {
    // NOTE: 이메일 카피하는 기능 추가
  };

  return (
    <Modal.Close>
      <div className='px-16 pt-32 flex flex-col items-center gap-24'>
        <MemberInfo member={member} />
        <div className='w-52 h-52 rounded-[9999px] bg-white' />
        {/* TODO : 프로필 컴포넌트로 변경하기 */}
        <div className='text-center'>
          <p className='text-text-primary text-md font-medium mb-[8px]'>
            {userName}
          </p>
          <p className='text-text-secondary text-xs font-normal '>
            {userEmail}
          </p>
        </div>

        <Button
          type='button'
          onClick={handleEmailCopy}
          color='primary'
          className='w-full'
        >
          이메일 복사하기
        </Button>
      </div>
    </Modal.Close>
  );
}

export default ProfileModal;
