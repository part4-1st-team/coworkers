import clsx from 'clsx';
import { ReactNode } from 'react';

interface UnderlineProps {
  children: ReactNode;
  active?: boolean;
  className?: string;
}
function UnderLine({ children, active, className }: UnderlineProps) {
  return (
    <div>
      {children}
      <div
        className={clsx(
          'h-3 rounded-8',
          active ? 'bg-brand-primary' : 'bg-background-secondary',
          className,
        )}
      />
    </div>
  );
}
export default UnderLine;
