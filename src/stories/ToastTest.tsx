import { ToastType } from '@/components/toast/ToastStore';
import clsx from 'clsx';

export interface ToastProps {
  type: ToastType;
}

function ToastTest({ type }: ToastProps) {
  const successStyle = 'bg-toast-success';
  const errorStyle = 'bg-toast-error';
  const iconStyle = 'rounded-full size-16 flex items-center justify-center';
  return (
    <div
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
          {/* {type === 'Success' ? (
            <IconCheckWhite />
          ) : (
            <IconXDark width={10} height={10} />
          )} */}
        </div>

        <div className='flex flex-col gap-5'>
          <span className='text-text-primary text-md font-medium'>{type}</span>
          <span className='text-text-secondary text-md font-normal'>
            {type === 'Error' ? '에러 문구입니다' : '성공 문구입니다'}
          </span>
        </div>
      </div>
      <button type='button' aria-label='토스트 닫기 버튼'>
        {/* <IconX width={16} height={16} /> */}
      </button>
    </div>
  );
}

export default ToastTest;
