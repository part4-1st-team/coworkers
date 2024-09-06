import { useState } from 'react';
import clsx from 'clsx';
import Button from '@/components/button/button';

function PickerButton() {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <Button
      type='button'
      size='md'
      className={clsx(
        'w-11 h-[48px]',
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

/*
 * `EnterButton` 컴포넌트는 활성화 상태에 따라 아이콘과 배경색이 변경되는 버튼입니다.
 *
 * ## 동작
 *
 * - 버튼을 클릭하면 활성화 상태가 토글됩니다.
 * - 활성화 상태에 따라 아이콘과 배경색이 변경됩니다.
 *
 * ## 아이콘
 *
 * - 비활성화 상태: `'/svgs/ic_arrow_btn_top_white.svg'`
 * - 활성화 상태: `'/svgs/ic_arrow_btn_top_gray.svg'`
 *
 * ## 배경색
 *
 * - 비활성화 상태: `bg-icon-primary`
 * - 활성화 상태: `bg-icon-brand`
 *
 * ## 사용 방법
 *
 * ```tsx
 * <EnterButton />
 * ```
 *
 * ## 스타일
 *
 * - 버튼의 크기: `w-6 h-6`
 * - 버튼의 배경색은 활성화 상태에 따라 달라집니다.
 */
