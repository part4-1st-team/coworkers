import useModalStore from '@/stores/ModalStore';
import Button from '../button/button';
import ModalTitle from './ModalTitle';

function LogoutModal() {
  const { setModalClose } = useModalStore();

  const handleLogout = () => {
    // NOTE: 로그아웃 로직 구현
  };

  return (
    <div className='px-36 pt-32 flex flex-col items-center gap-24'>
      <ModalTitle title='로그아웃 하시겠어요?' />

      <div className='flex gap-8 w-full'>
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
      </div>
    </div>
  );
}

export default LogoutModal;
