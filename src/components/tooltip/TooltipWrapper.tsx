import clsx from 'clsx';
import { ReactNode, useState } from 'react';

interface ToolTipProps {
  children: ReactNode;
  message: ReactNode;
  className?: string;
  position?: string;
  messageClassName?: string;
}

function TooltipWrapper({
  children,
  message,
  className = '',
  position = 'top-[-200%]',
  messageClassName = '',
}: ToolTipProps) {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  let timeoutRef: any = null; // 타이머 참조를 저장할 변수
  const TOOLTIP_TIME = 200;

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef);
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    timeoutRef = setTimeout(() => {
      setShowTooltip(false);
    }, TOOLTIP_TIME);
  };

  const handleMessageMouseEnter = () => {
    clearTimeout(timeoutRef); // 리스트에 마우스가 들어오면 타이머 클리어
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={clsx('relative', className)}
    >
      {children}
      {showTooltip && (
        <div
          onMouseEnter={handleMessageMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={clsx(
            'absolute text-md text-text-secondary dark:text-text-secondary-dark  whitespace-nowrap p-10 bg-background-tertiary dark:bg-background-tertiary-dark shadow-md rounded-12',
            position,
            messageClassName,
          )}
        >
          {message}
        </div>
      )}
    </div>
  );
}

export default TooltipWrapper;
