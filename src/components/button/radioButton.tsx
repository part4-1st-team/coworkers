import { useState } from 'react';
import Button from '@/components/button/button';
import clsx from 'clsx';

function RadioButton() {
  // 버튼의 활성화 상태를 관리하는 상태 변수
  const [isActive, setIsActive] = useState(false);

  // 클릭 시 버튼의 활성화 상태를 토글하는 핸들러
  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <Button
      type='button'
      rounded
      className='bg-background-secondary w-6 h-6 border border-icon-primary'
      onClick={handleClick}
    >
      <div
        className={clsx(
          'w-3 h-3 rounded-full',
          isActive ? 'bg-icon-brand' : 'bg-background-secondary',
        )}
      />
    </Button>
  );
}

export default RadioButton;

/*
 * `RadioButton` 컴포넌트는 클릭 시 활성화 상태에 따라 내부 원의 색상이 변경되는 버튼입니다.
 *
 * ## 동작
 *
 * - 버튼을 클릭하면 활성화 상태가 토글됩니다.
 * - 활성화 상태에 따라 내부 원의 배경색이 변경됩니다.
 *
 * ## 활성화 상태
 *
 * - 비활성화 상태: 내부 원의 배경색은 `bg-background-secondary`입니다.
 * - 활성화 상태: 내부 원의 배경색은 `bg-icon-brand`입니다.
 *
 * ## 사용 방법
 *
 * ```tsx
 * <RadioButton />
 * ```
 *
 * ## 스타일
 *
 * - 버튼의 크기: `w-6 h-6`
 * - 버튼의 배경색: `bg-background-secondary`
 * - 버튼의 테두리: `border border-icon-primary`
 * - 내부 원의 크기: `w-3 h-3`
 * - 내부 원의 배경색은 활성화 상태에 따라 달라집니다.
 */
