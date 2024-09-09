import { IconAlert } from '@/assets/IconList';
import Button from '@/components/button/button';
import useModalStore from '@/stores/ModalStore';
import Modal from './Modal';

function MemberDeleteModal() {
  const { setModalClose } = useModalStore();

  const handleMemberDelete = () => {
    // NOTE: 회원 탈퇴 로직 구현
  };

  return (
    <div className='flex flex-col items-center px-36 pt-24'>
      <IconAlert />
      <div className='mt-16 mb-24 flex flex-col gap-8 items-center text-center'>
        <Modal.Title title='회원 탈퇴를 진행하시겠어요?' />
        <Modal.Description description='그룹장으로 있는 그룹은 자동으로 삭제되고,<br/>모든 그룹에서 나가집니다.' />
      </div>
      <Modal.Buttons>
        <Button
          type='button'
          onClick={setModalClose}
          color='white'
          className='w-full'
        >
          닫기
        </Button>
        <Button
          type='button'
          onClick={handleMemberDelete}
          color='red'
          className='w-full'
        >
          회원 탈퇴
        </Button>
      </Modal.Buttons>
    </div>
  );
}

export default MemberDeleteModal;
