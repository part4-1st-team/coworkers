/* eslint-disable react/button-has-type */
/* eslint-disable react/require-default-props */
import clsx from 'clsx';

type ButtonType = 'button' | 'submit' | 'reset';

interface CircleButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  type?: ButtonType;
  text?: string;
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

function CircleButton({
  text,
  type = 'button',
  disabled = false,
  icon,
  className,
  children,
  ...props
}: CircleButtonProps) {
  const baseButton =
    'w-16 h-16 text-md font-semibold bg-background-tertiary text-text-inverse rounded-full flex items-center justify-center';

  const buttonClass = clsx(baseButton, className);

  return (
    <button type={type} disabled={disabled} className={buttonClass} {...props}>
      {icon && <span>{icon}</span>}
      {text && <span>{text}</span>}
      {children}
    </button>
  );
}

CircleButton.defaultProps = {
  disabled: false,
  type: 'button',
  className: '',
};

export default CircleButton;
