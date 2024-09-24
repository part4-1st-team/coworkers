import useModalStore from '@/stores/ModalStore';
import useUserStore from '@/stores/userStore';
import { useRouter } from 'next/router';
import Button from '../button/button';
import Modal from './Modal';

function LogoutModal() {
  const router = useRouter();
  const { setModalClose } = useModalStore();
  const { setLogout } = useUserStore();

  const handleLogout = () => {
    setLogout();
    setModalClose();
    router.push('/');
  };

  return (
    <div className='px-36 pt-32 flex flex-col items-center gap-24'>
      <Modal.Title title='로그아웃 하시겠어요?' />

      <Modal.Buttons>
        <Button
          type='button'
          color='white'
          onClick={setModalClose}
          className='w-full tablet:w-136'
        >
          닫기
        </Button>
        <Button
          type='button'
          color='red'
          onClick={handleLogout}
          className='w-full tablet:w-136'
        >
          로그아웃
        </Button>
      </Modal.Buttons>
    </div>
  );
}

export default LogoutModal;
