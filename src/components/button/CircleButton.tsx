/* eslint-disable react/button-has-type */
import clsx from 'clsx';

type ColorType = 'primary' | 'white' | 'red' | 'outline';

interface CircleButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  color?: ColorType; // 버튼의 색상 스타일
  icon?: React.ReactNode; // 버튼 내부에 들어갈 아이콘 (ReactNode로 전달 가능)
}

function CircleButton({
  icon,
  color = 'primary',

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

  const buttonClass = clsx(baseButton, colorStyles[color]);

  return (
    <button {...props} className={buttonClass}>
      {icon && <span className='icon'>{icon}</span>}
    </button>
  );
}

CircleButton.defaultProps = {
  color: 'primary',
  icon: null,
};

export default CircleButton;
