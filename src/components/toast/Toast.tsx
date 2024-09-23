import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import ToastItem from './ToastItem';
import useToastStore from './ToastStore';

function Toast() {
  const [mounted, setMounted] = useState<boolean>(false);

  const { toastList } = useToastStore();

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  if (typeof window === 'undefined') return null; // 클라이언트 렌더링
  if (!mounted) return null;
  if (toastList.length === 0) return null;

  const toastElement = document.getElementById('_toast');

  return (
    <>
      {createPortal(
        <div className='fixed top-70 right-30 flex flex-col gap-5'>
          {toastList.map((toast) => (
            <ToastItem key={toast.id} toast={toast} />
          ))}
        </div>,
        toastElement as HTMLElement,
      )}
    </>
  );
}

export default Toast;
