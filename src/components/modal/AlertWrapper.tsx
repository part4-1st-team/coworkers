import { IconAlert } from '@/assets/IconList';
import { ReactNode } from 'react';

function AlertWrapper({ children }: { children: ReactNode }) {
  return (
    <div className='flex flex-col items-center px-36 pt-24'>
      <IconAlert />

      {children}
    </div>
  );
}

export default AlertWrapper;
