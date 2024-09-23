import { IconEdit } from '@/assets/IconList';
import PasswordChangeModal from '@/components/modal/PasswordChangeModal';
import useModalStore from '@/stores/ModalStore';

function ChangePasswordButton() {
  const { setModalOpen } = useModalStore();
  return (
    <button
      type='button'
      className='text-brand-primary flex items-center gap-5'
      onClick={() => setModalOpen(<PasswordChangeModal />)}
    >
      <IconEdit width={20} height={20} className='fill-brand-primary' />
      비밀번호 변경
    </button>
  );
}
export default ChangePasswordButton;
