import Button from '@/components/button/button';
import useModalStore from '@/stores/ModalStore';
import Modal from './Modal';
import useToast from '../toast/useToast';
import ProfileImage from '../member/ProfileImage';

function ProfileModal({ member }: { member: IMember }) {
  const { userName, userEmail, userImage } = member;
  const { toast } = useToast();
  const { setModalClose } = useModalStore();

  const handleEmailCopy = async () => {
    try {
      await navigator.clipboard.writeText(userEmail);
      toast('Success', '이메일이 복사되었습니다.');
      setModalClose();
    } catch (error) {
      toast('Error', '이메일 복사에 실패했습니다.');
    }
  };

  return (
    <Modal.Close>
      <div className='px-16 pt-32 flex flex-col items-center gap-24'>
        <ProfileImage userImage={userImage} size={52} />
        {/* TODO : 텍스트 생략 */}
        <div className='text-center'>
          <p className='text-text-primary-dark text-md font-medium mb-8 overflow-hidden whitespace-nowrap text-ellipsis'>
            {userName}
          </p>
          <p className='text-text-secondary-dark text-xs font-normal overflow-hidden whitespace-nowrap text-ellipsis'>
            {userEmail}
          </p>
        </div>

        <Button
          type='button'
          onClick={handleEmailCopy}
          color='primary'
          className='w-280'
        >
          이메일 복사하기
        </Button>
      </div>
    </Modal.Close>
  );
}

export default ProfileModal;
