import React, { forwardRef } from 'react';
import clsx from 'clsx';
import Label from './Label';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  children?: React.ReactNode;
  value?: string; // value를 제어할 수 있는 컴포넌트
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ children, className = '', value = '', onChange, ...props }, ref) => {
    const baseClasses =
      'w-full px-16 py-14 rounded-xl bg-background-secondary border border-border-primary text-text-primary font-font-normal';
    const placeholderClasses = 'placeholder-text-default text-lg font-normal';
    const focusClasses =
      'pl-16 focus:border-interaction-focus border focus:outline-none';

    const hoverClasses = !props.disabled
      ? 'hover:border-interaction-hover border hover:outline-none'
      : '';
    const disabledClasses = props.disabled
      ? 'cursor-not-allowed placeholder-text-disabled focus:outline-none'
      : '';

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
        value={value}
        onChange={onChange}
        className={classNames}
        {...props}
      />
    );
  },
);

// displayName 설정 (forwardRef 사용 시 유용)
Input.displayName = 'Input';

// Input 컴포넌트에 Label 속성 추가
interface InputComponent
  extends React.ForwardRefExoticComponent<
    InputProps & React.RefAttributes<HTMLInputElement>
  > {
  Label: typeof Label;
}

const InputWithLabel = Input as InputComponent;
InputWithLabel.Label = Label;

export default InputWithLabel;
