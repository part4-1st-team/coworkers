/* eslint-disable react/function-component-definition */
/* eslint-disable react/require-default-props */
import clsx from 'clsx';

type ColorType =
  | 'primary'
  | 'hover'
  | 'disabled'
  | 'danger'
  | 'outline'
  | 'outlineDisabled'
  | '';
type SizeType = 'square' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | '';
type ButtonType = 'bar' | 'fullRounded' | 'circle';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  buttonType?: ButtonType;
  color?: ColorType;
  size?: SizeType;
  fullWidth?: boolean;
  className?: string;
  icon?: boolean;
}

const baseButton = 'inline-flex items-center justify-center text-text-inverse';

const buttonKind = {
  bar: 'rounded-xl',
  fullRounded: 'rounded-full',
  circle: 'rounded-full',
};

const colorMap = {
  primary: 'bg-brand-primary',
  hover: 'bg-interaction-hover',
  disabled: 'bg-interaction-inactive',
  danger: 'bg-status-danger',
  outline:
    'bg-background-tertiary border-border-primary border text-text-primary',
  outlineDisabled:
    'bg-background-tertiary border-border-secondary border text-text-inverse',
  '': '',
};

const sizeMap = {
  XXL: 'w-[460px] h-[47px]',
  XL: 'w-[343px] h-[47px]',
  L: 'w-[280px] h-[47px]',
  M: 'w-[186px] h-[48px]',
  S: 'w-[184px] h-[48px]',
  XS: 'w-[136px] h-[47px]',
  square: 'w-[24px] h-[24px] py-0',
  '': '',
};

const fullWidthMap = 'w-full';

// Button 컴포넌트 함수 선언식
function Button({
  children,
  buttonType = 'bar',
  color = '',
  size = '',
  fullWidth = false,
  className,
  icon = false,
  ...rest
}: ButtonProps) {
  const buttonClass = clsx(
    baseButton,
    buttonKind[buttonType],
    colorMap[color],
    sizeMap[size],
    fullWidth && fullWidthMap,
    icon && 'gap-2',
    className,
  );

  return (
    <button type='button' {...rest} className={buttonClass}>
      {children}
    </button>
  );
}

// Button.Icon 하위 컴포넌트 정의
Button.Icon = function Icon({ icon }: { icon: React.ReactNode }) {
  return <span>{icon}</span>;
};

// Button.Text 하위 컴포넌트 정의
Button.Text = function Text({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={className}>{children}</span>;
};

export default Button;
