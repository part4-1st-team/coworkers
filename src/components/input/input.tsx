import clsx from 'clsx';
import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * 추가적인 커스텀 클래스 네임을 설정합니다.
   */
  className?: string;

  /**
   * 입력 필드에 포함할 자식 노드를 설정합니다.
   */
  children?: React.ReactNode;
  error?: boolean;
}

/**
 * `Input` 컴포넌트는 기본적인 입력 필드를 렌더링하며, 다양한 스타일과 상태를 지원합니다.
 *
 * @param {InputProps} props - 입력 필드의 속성
 * @returns {JSX.Element} 렌더링된 입력 필드 요소
 *
 * @example
 * ```tsx
 * <Input
 *   id="username"
 *   placeholder="Enter your username"
 *   disabled={false}
 *   className="custom-class"
 * />
 * ```
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ children, className = '', error, ...props }, ref) => {
    // 기본 클래스들
    const baseClasses =
      'w-full px-16 py-14 text-lg font-normal rounded-xl bg-background-secondary border border-background-tertiary text-text-primary font-font-normal';
    const placeholderClasses = 'placeholder-text-default text-lg font-normal';
    const focusClasses =
      'pl-16 focus:border-interaction-focus border focus:outline-none';

    const disabledClasses = props.disabled
      ? 'cursor-not-allowed placeholder-text-disabled focus:outline-none'
      : '';

    const errorClass = clsx({
      'border border-status-danger focus:border-status-danger': error,
    });

    // 전체 클래스명 생성
    const classNames = clsx(
      baseClasses,
      placeholderClasses,
      focusClasses,
      errorClass,
      disabledClasses,
      className,
    );

    return (
      <input
        ref={ref} // forwardRef를 통해 ref 전달
        id={props.id}
        disabled={props.disabled}
        className={classNames}
        {...props}
      />
    );
  },
);

// displayName 설정 (forwardRef 사용 시 유용)
Input.displayName = 'Input';

export default Input;
