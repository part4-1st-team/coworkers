import useDetectClose from '@/hooks/useDetectClose';
import useEscapeClose from '@/hooks/useEscapeClose';
import useHalfPageStore from '@/stores/HalfPageStore';
import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

function HalfPosition({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) {
  const ref = useDetectClose(onClose);
  return (
    <div ref={ref} className='fixed right-0 top-60 w-full tablet:w-1/2'>
      {children}
    </div>
  );
}

function HalfPortal({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState<boolean>(false);
  const { isHalfPageOpen, setHalfPageClose } = useHalfPageStore();
  useEscapeClose(setHalfPageClose);

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
  if (!isHalfPageOpen) return null;

  const HALF = document.getElementById('_half');

  return (
    <>
      {createPortal(
        <HalfPosition onClose={setHalfPageClose}>{children}</HalfPosition>,
        HALF as HTMLElement,
      )}
    </>
  );
}

export default HalfPortal;
