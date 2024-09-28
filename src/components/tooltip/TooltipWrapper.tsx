import { ReactNode, useState } from 'react';

interface ToolTipProps {
  children: ReactNode;
  message: string;
}

function TooltipWrapper({ children, message }: ToolTipProps) {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  return (
    <div
      onMouseEnter={() => setShowTooltip(true)} // 마우스가 버튼에 올라갔을 때
      onMouseLeave={() => setShowTooltip(false)} // 마우스가 버튼을 떠났을 때
      className='relative'
    >
      {children}
      {showTooltip && (
        <div className='absolute top-[-200%] text-md text-text-secondary dark:text-text-secondary-dark  whitespace-nowrap p-10 bg-background-tertiary dark:bg-background-tertiary-dark shadow-md rounded-12'>
          {message}
        </div>
      )}
    </div>
  );
}

export default TooltipWrapper;
