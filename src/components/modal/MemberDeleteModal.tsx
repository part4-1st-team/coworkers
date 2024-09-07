import { IconAlert } from '@/assets/IconList';
import Button from '@/components/button/button';
import useModalStore from '@/stores/ModalStore';
import ModalDescription from './ModalDescription';
import ModalTitle from './ModalTitle';

function MemberDeleteModal() {
  const { setModalClose } = useModalStore();

  const handleMemberDelete = () => {
    // NOTE: 회원 탈퇴 로직 구현
  };

  return (
    <div className='flex flex-col items-center px-36 pt-24'>
      <IconAlert />
      <div className='mt-16 mb-24 flex flex-col gap-8 items-center text-center'>
        <ModalTitle title='회원 탈퇴를 진행하시겠어요?' />
        <ModalDescription description='그룹장으로 있는 그룹은 자동으로 삭제되고,<br/>모든 그룹에서 나가집니다.' />
      </div>
      <div className='flex justify-center gap-8 w-full'>
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
      </div>
    </div>
  );
}

export default MemberDeleteModal;
