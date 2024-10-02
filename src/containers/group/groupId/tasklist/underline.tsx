import clsx from 'clsx';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface UnderlineProps {
  children: ReactNode;
  active?: boolean;
  className?: string;
  wrapperClassName?: string;
  position?: 'page' | 'section';
}
function UnderLine({
  children,
  active,
  className,
  position = 'page',
  wrapperClassName,
}: UnderlineProps) {
  return (
    <div className={twMerge('flex flex-col items-center', wrapperClassName)}>
      {children}
      <div
        className={twMerge(
          'h-3 rounded-8 w-full',
          position === 'page'
            ? 'bg-background-secondary dark:bg-background-secondary-dark'
            : 'bg-border-primary dark:bg-border-primary-dark ',
          active && 'bg-brand-primary',

          className,
        )}
      />
    </div>
  );
}
export default UnderLine;
