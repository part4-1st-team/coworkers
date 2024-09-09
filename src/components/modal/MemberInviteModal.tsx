import Button from '@/components/button/button';
import Modal from './Modal';

function MemberInviteModal() {
  const handleLinkCopy = () => {
    // NOTE: 링크 복사하는 핸들러 함수 작성하기
  };

  return (
    <Modal.Close>
      <div className='px-36 pt-32 flex flex-col items-center '>
        <Modal.Title title='멤버 초대' />
        <Modal.Description description='그룹에 참여할 수 있는 링크를 복사합니다.' />
        <Button
          type='button'
          color='primary'
          onClick={handleLinkCopy}
          className='w-full mt-40'
        >
          링크 복사하기
        </Button>
      </div>
    </Modal.Close>
  );
}

export default MemberInviteModal;
