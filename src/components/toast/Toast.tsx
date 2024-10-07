import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';
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
        <div
          className={twMerge(
            'flex flex-col gap-8 w-full tablet:w-[30%] items-center',
            'fixed top-80 left-1/2 translate-x-[-50%]',
            'tablet:top-80 tablet:right-20 tablet:bottom-auto tablet:left-auto tablet:translate-x-0',
          )}
        >
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
