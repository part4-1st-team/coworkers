import useModalStore from '@/stores/ModalStore';
import ModalPortal from './ModalPortal';
import ModalTitle from './ModalTitle';

function LogoutModal() {
  const { setModalClose } = useModalStore();

  const handleLogout = () => {
    // NOTE: 로그아웃 로직 구현
  };

  return (
    <ModalPortal>
      <div className='px-[36px] pt-[32px] flex flex-col items-center gap-[24px]'>
        <ModalTitle title='로그아웃 하시겠어요?' />

        <div className='flex gap-[8px]'>
          <button
            className='bg-white w-[136px] h-[48px] rounded-[12px]'
            onClick={setModalClose}
          >
            닫기
          </button>
          <button
            className='bg-modal-danger w-[136px] h-[48px] rounded-[12px] text-white'
            onClick={handleLogout}
          >
            로그아웃
          </button>
          {/* TODO: 버튼 컴포넌트 변경 */}
        </div>
      </div>
    </ModalPortal>
  );
}

export default LogoutModal;
