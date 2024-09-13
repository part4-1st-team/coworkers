import { IconCheckWhite, IconX, IconXDark } from '@/assets/IconList';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import useToastStore, { Toast } from './ToastStore';

const DURATION = 2000;
const ANIMATION = 500;

function ToastItem({ toast }: { toast: Toast }) {
  const [visible, setVisible] = useState(true);
  const { removeToastList } = useToastStore();

  const { id, type, message } = toast;

  const successStyle = 'bg-toast-success';
  const errorStyle = 'bg-toast-error';
  const iconStyle = 'rounded-full size-16 flex items-center justify-center';

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, DURATION);

    const removeTimer = setTimeout(() => {
      removeToastList(id);
    }, DURATION + ANIMATION);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, [id, removeToastList]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className={clsx(
        'bg-background-secondary w-300 h-70 relative rounded-4 overflow-hidden flex items-center py-20 px-25 justify-between',
      )}
    >
      <div
        className={clsx(
          'w-4 h-full absolute top-0 left-0',
          type === 'Success' ? successStyle : errorStyle,
        )}
      />
      <div className='flex gap-15 items-center'>
        <div
          className={clsx(
            iconStyle,
            type === 'Success' ? successStyle : errorStyle,
          )}
        >
          {type === 'Success' ? (
            <IconCheckWhite />
          ) : (
            <IconXDark width={10} height={10} />
          )}
        </div>
        <div className='flex flex-col gap-5'>
          <span className='text-text-primary text-md font-medium'>{type}</span>
          <span className='text-text-secondary text-md font-normal'>
            {message}
          </span>
        </div>
      </div>
      <button
        type='button'
        onClick={() => removeToastList(id)}
        aria-label='토스트 닫기 버튼'
      >
        <IconX width={16} height={16} />
      </button>
    </motion.div>
  );
}

export default ToastItem;
