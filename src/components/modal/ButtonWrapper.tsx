import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

function ButtonWrapper({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={twMerge('flex gap-8 w-full items-center', className)}>
      {children}
    </div>
  );
}

export default ButtonWrapper;
