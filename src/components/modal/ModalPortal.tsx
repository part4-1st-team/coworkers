import useModalStore from '@/stores/ModalStore';
import { motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useMediaQuery } from 'react-responsive';

function ModalOverlay({ onClose }: { onClose: () => void }) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className='modal-overlay'
      onClick={onClose}
      role='button'
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label='Close modal'
    />
  );
}

function ModalContainer({ children }: { children: ReactNode }) {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <motion.div
      initial={{
        scale: 0.8,
        translateX: isMobile ? 0 : '-50%',
        translateY: isMobile ? '50%' : '50%',
        opacity: 0,
      }}
      animate={{
        scale: 1,
        translateX: isMobile ? 0 : '-50%',
        translateY: isMobile ? 0 : '-50%',
        opacity: 1,
      }}
      transition={{ duration: 0.7, ease: [0.165, 0.84, 0.44, 1] }}
      className='modal-container modal-container-position-mobile tablet:modal-container-position text-center'
    >
      {children}
    </motion.div>
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
