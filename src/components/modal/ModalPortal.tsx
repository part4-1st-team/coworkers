import useModalStore from '@/stores/ModalStore';
import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

function ModalOverlay({ onClose }: { onClose: () => void }) {
  return <div className='modal-overlay' onClick={onClose} />;
}

function ModalContainer({ children }: { children: ReactNode }) {
  return (
    <div className='modal-container modal-container-position-mobile tablet:modal-container-position'>
      {children}
    </div>
  );
}

function ModalPortal({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState<boolean>(false);
  const { isModalOpen, setModalClose } = useModalStore();

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'hidden';

    return () => {
      setMounted(false);
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (typeof window === 'undefined') return null; // 클라이언트 렌더링
  if (!mounted) return null;
  if (!isModalOpen) return null;

  const modalElement = document.getElementById('_modal');

  return (
    <>
      {createPortal(
        <>
          <ModalOverlay onClose={setModalClose} />,
          <ModalContainer>{children}</ModalContainer>
        </>,
        modalElement as HTMLElement,
      )}
    </>
  );
}

export default ModalPortal;
