/* eslint-disable react/button-has-type */
import clsx from 'clsx';

type ColorType = 'primary' | 'white' | 'red' | 'outline';
type ButtonType = 'button' | 'submit' | 'reset';

interface CircleButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type?: ButtonType; // 버튼의 타입 ('button', 'submit', 'reset')
  color?: ColorType; // 버튼의 색상 스타일
  icon?: React.ReactNode; // 버튼 내부에 들어갈 아이콘 (ReactNode로 전달 가능)
  className?: string; // 추가적인 커스텀 클래스 네임
}

function CircleButton({
  icon,
  type = 'button',
  color = 'primary',
  className,
  ...props
}: CircleButtonProps) {
  const baseButton = 'inline-flex items-center justify-center rounded-full';

  /* 컬러에 따른 스타일 분기 */
  const colorStyles = {
    primary:
      'bg-background-secondary hover:bg-interaction-hover active:bg-interaction-pressed ',
    white:
      'bg-background-inverse text-brand-primary border border-border-primary hover:text-interaction-hover hover:border hover:border-interaction-hover active:border-interaction-pressed active:text-interaction-pressed disabled:bg-interaction-inactive',
    red: 'bg-status-danger text-text-inverse',
    outline:
      'bg-none text-brand-primary border border-brand-primary hover:border hover:border-interaction-hover hover:text-interaction-hover active:text-interaction-pressed disabled:border-interaction-inactive',
  };

  const buttonClass = clsx(baseButton, colorStyles[color], className);

  return (
    <button type={type} {...props} className={buttonClass}>
      {icon && <span className='icon'>{icon}</span>}
    </button>
  );
}

CircleButton.defaultProps = {
  type: 'button',
  color: 'primary',
  icon: null,
  className: '',
};

export default CircleButton;
