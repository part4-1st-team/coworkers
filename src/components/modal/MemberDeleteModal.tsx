import { IconAlert } from '@/assets/IconList';
import useModalStore from '@/stores/ModalStore';
import ModalDescription from './ModalDescription';
import ModalPortal from './ModalPortal';
import ModalTitle from './ModalTitle';

function MemberDeleteModal() {
  const { setModalClose } = useModalStore();

  const handleMemberDelete = () => {
    // NOTE: 회원 탈퇴 로직 구현
  };

  return (
    <ModalPortal>
      <div className='flex flex-col items-center px-[36px] pt-[24px]'>
        <IconAlert />
        <div className='mt-[16px] mb-[24px] flex flex-col gap-[8px] items-center text-center'>
          <ModalTitle title='회원 탈퇴를 진행하시겠어요?' />
          <ModalDescription description='그룹장으로 있는 그룹은 자동으로 삭제되고,<br/>모든 그룹에서 나가집니다.' />
        </div>
        <div className='flex justify-center gap-[8px]'>
          <button
            type='button'
            onClick={setModalClose}
            className='bg-white rounded-[12px] w-[136px] h-[48px]'
          >
            닫기
          </button>
          <button
            type='button'
            onClick={handleMemberDelete}
            className='rounded-[12px] w-[136px] h-[48px] bg-modal-danger text-white'
          >
            회원 탈퇴
          </button>
        </div>
      </div>
    </ModalPortal>
  );
}

export default MemberDeleteModal;
