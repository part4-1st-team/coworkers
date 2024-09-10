import { useState } from 'react';
import clsx from 'clsx';
import CircleButton from './CircleButton';

/**
 * RadioButton 컴포넌트는 클릭 시 활성화 상태가 토글되는 원형 버튼을 나타냅니다.
 *
 * @component
 * @example
 * <RadioButton />
 *
 * @returns {JSX.Element} 클릭 시 원형 버튼의 내부 상태가 변경되는 버튼을 반환합니다. 버튼의 내부 원은 활성화 상태에 따라 크기와 색상이 변경됩니다.
 */
function RadioButton() {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <CircleButton
      type='button'
      className='bg-background-secondary w-28 h-28 border border-icon-primary p-0 flex items-center justify-center hover:bg-transparent focus:bg-transparent'
      onClick={handleClick}
    >
      <div
        className={clsx(
          'transition-all duration-300 ease-in-out rounded-full',
          isActive
            ? 'bg-icon-brand w-12 h-12'
            : 'bg-background-secondary w-0 h-0',
        )}
      />
    </CircleButton>
  );
}

export default RadioButton;
