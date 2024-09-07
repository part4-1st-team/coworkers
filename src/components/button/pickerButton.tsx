import { useState } from 'react';
import clsx from 'clsx';
import Button from '@/components/button/button';

/**
 * `PickerButton` 컴포넌트는 버튼 클릭 시 활성화 상태를 토글하며,
 * 활성화 상태에 따라 버튼의 배경색과 텍스트 색상을 변경합니다.
 *
 * @returns {JSX.Element} 렌더링된 버튼 요소
 *
 * @example
 * ```tsx
 * <PickerButton />
 * ```
 */
function PickerButton() {
  // 버튼의 활성화 상태를 관리하는 상태 변수
  const [isActive, setIsActive] = useState(false);

  // 클릭 시 버튼의 활성화 상태를 토글하는 핸들러
  const handleClick = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <Button
      type='button'
      size='md'
      className={clsx(
        'w-[44px] h-[48px]',
        isActive
          ? 'bg-brand-primary text-text-primary'
          : 'bg-background-secondary text-text-default',
      )}
      onClick={handleClick}
    >
      일
    </Button>
  );
}

export default PickerButton;
