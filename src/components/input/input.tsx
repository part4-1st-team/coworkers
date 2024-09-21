import React, { forwardRef } from 'react';
import clsx from 'clsx';
import Label from './Label';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // 추가적인 커스텀 클래스 네임을 설정
  className?: string;
  // 입력 필드에 포함할 자식 노드 설정
  children?: React.ReactNode;
}

// Label 컴포넌트를 InputProps에 추가
interface InputComponent extends React.ForwardRefExoticComponent<InputProps> {
  Label: typeof Label;
}

// Input 컴포넌트 정의
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ children, className = '', ...props }, ref) => {
    // 기본 클래스들
    const baseClasses =
      'w-full px-16 py-14 rounded-xl bg-background-secondary border border-border-primary text-text-primary font-font-normal';
    const placeholderClasses = 'placeholder-text-default text-lg font-normal';
    const focusClasses =
      'pl-16 focus:border-interaction-focus border focus:outline-none';

    // 조건부 클래스
    const hoverClasses = !props.disabled
      ? 'hover:border-interaction-hover border hover:outline-none'
      : '';
    const disabledClasses = props.disabled
      ? 'cursor-not-allowed placeholder-text-disabled focus:outline-none'
      : '';

    // 전체 클래스명
    const classNames = clsx(
      baseClasses,
      placeholderClasses,
      focusClasses,
      hoverClasses,
      disabledClasses,
      className,
    );

    return (
      <input
        ref={ref}
        id={props.id}
        disabled={props.disabled}
        className={classNames}
        {...props}
      />
    );
  },
) as InputComponent;

Input.displayName = 'Input';
Input.Label = Label;

export default Input;
