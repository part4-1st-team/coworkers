import { ReactNode } from 'react';

function ButtonWrapper({ children }: { children: ReactNode }) {
  return <div className='flex gap-8 w-full items-center'>{children}</div>;
}

export default ButtonWrapper;
