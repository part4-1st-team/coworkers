import MemberInviteModal from '@/components/modal/MemberInviteModal';
import useModalStore from '@/stores/ModalStore';

function MemberInviteButton() {
  const { setModalOpen } = useModalStore();

  return (
    <button
      type='button'
      onClick={() => setModalOpen(<MemberInviteModal />)}
      className='text-brand-primary text-md font-normal'
    >
      + 새로운 멤버 초대하기
    </button>
  );
}

export default MemberInviteButton;
