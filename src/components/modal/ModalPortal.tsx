import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

function ModalOverlay() {
  return <div className='modal-overlay' />;
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

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'hidden';

    return () => {
      setMounted(false);
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (typeof window === 'undefined') return <></>; // 클라이언트 렌더링
  if (!mounted) return <></>;

  const modalElement = document.getElementById('_modal');

  return (
    <>
      {createPortal(<ModalOverlay />, modalElement as HTMLElement)}
      {createPortal(
        <ModalContainer>{children}</ModalContainer>,
        modalElement as HTMLElement,
      )}
    </>
  );
}

export default ModalPortal;
