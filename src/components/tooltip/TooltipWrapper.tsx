import clsx from 'clsx';
import { ReactNode, useState } from 'react';

interface ToolTipProps {
  children: ReactNode;
  message: string;
  className?: string;
  position?: string;
}

function TooltipWrapper({
  children,
  message,
  className = '',
  position = 'top-[-200%]',
}: ToolTipProps) {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  return (
    <div
      onMouseEnter={() => setShowTooltip(true)} // 마우스가 버튼에 올라갔을 때
      onMouseLeave={() => setShowTooltip(false)} // 마우스가 버튼을 떠났을 때
      className={clsx('relative', className)}
    >
      {children}
      {showTooltip && (
        <div
          className={clsx(
            'absolute text-md text-text-secondary dark:text-text-secondary-dark  whitespace-nowrap p-10 bg-background-tertiary dark:bg-background-tertiary-dark shadow-md rounded-12',
            position,
          )}
        >
          {message}
        </div>
      )}
    </div>
  );
}

export default TooltipWrapper;
