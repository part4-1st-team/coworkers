/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/require-default-props */

import { useState } from 'react';
import Button from '@/components/button/button';
import { IconArrowTOP } from '@/assets/IconList';

interface EnterButtonProps {
  /**
   * 추가적인 커스텀 클래스 네임
   */
  className?: string;

  /**
   * 버튼 클릭 시 호출되는 외부 핸들러 함수
   */
  onClick?: () => void;
}

/**
 * `EnterButton` 컴포넌트는 활성화 상태에 따라 배경색이 변경되는 버튼입니다.
 *
 * 이 버튼은 클릭 시 활성화 상태를 토글하며, `onClick` prop을 통해 외부 클릭 핸들러를 전달할 수 있습니다.
 *
 * @param {EnterButtonProps} props - 컴포넌트의 속성
 * @param {string} [props.className=''] - 추가적인 커스텀 클래스 네임
 * @param {() => void} [props.onClick] - 버튼 클릭 시 호출되는 외부 핸들러 함수
 *
 * @returns {JSX.Element} 렌더링된 버튼 요소
 *
 * @example
 * ```tsx
 * <EnterButton className="my-custom-class" onClick={() => console.log('Button clicked!')} />
 * ```
 */
function EnterButton({ className = '', onClick }: EnterButtonProps) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsActive((pre) => !pre);
    if (onClick) onClick();
  };

  return (
    <Button
      type='button'
      color='white'
      rounded
      icon={<IconArrowTOP />}
      className={`w-6 h-6 border-none ${isActive ? 'bg-icon-brand' : 'bg-icon-primary'} ${className}`}
      onClick={handleClick}
    />
  );
}

export default EnterButton;
