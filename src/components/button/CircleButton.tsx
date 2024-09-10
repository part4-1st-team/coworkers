/* eslint-disable react/require-default-props */
/* eslint-disable react/button-has-type */
// /* eslint-disable react/button-has-type */
// import clsx from 'clsx';

// type ColorType = 'primary' | 'white' | 'red' | 'outline';

// interface CircleButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
//   color?: ColorType; // 버튼의 색상 스타일
//   icon?: React.ReactNode; // 버튼 내부에 들어갈 아이콘 (ReactNode로 전달 가능)
// }

// function CircleButton({
//   icon,
//   color = 'primary',

//   ...props
// }: CircleButtonProps) {
//   const baseButton = 'inline-flex items-center justify-center rounded-full';

//   /* 컬러에 따른 스타일 분기 */
//   const colorStyles = {
//     primary:
//       'bg-background-secondary hover:bg-interaction-hover active:bg-interaction-pressed ',
//     white:
//       'bg-background-inverse text-brand-primary border border-border-primary hover:text-interaction-hover hover:border hover:border-interaction-hover active:border-interaction-pressed active:text-interaction-pressed disabled:bg-interaction-inactive',
//     red: 'bg-status-danger text-text-inverse',
//     outline:
//       'bg-none text-brand-primary border border-brand-primary hover:border hover:border-interaction-hover hover:text-interaction-hover active:text-interaction-pressed disabled:border-interaction-inactive',
//   };

//   const buttonClass = clsx(baseButton, colorStyles[color]);

//   return (
//     <button {...props} className={buttonClass}>
//       {icon && <span className='icon'>{icon}</span>}
//     </button>
//   );
// }

// CircleButton.defaultProps = {
//   color: 'primary',
//   icon: null,
// };

// export default CircleButton;

import clsx from 'clsx';

type ButtonType = 'button' | 'submit' | 'reset';

interface CircleButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  type?: ButtonType;
  text?: string;
  icon?: React.ReactNode; // 아이콘을 외부에서 전달받는 프롭으로 변경
  className?: string;
}

function CircleButton({
  text,
  type = 'button',
  disabled = false,
  icon,
  className,
  ...props
}: CircleButtonProps) {
  const baseButton =
    'w-16 h-16 text-md font-semibold bg-background-tertiary text-text-inverse rounded-full flex items-center justify-center';

  const buttonContent = (
    <div className='flex items-center gap-4'>
      {icon && <span>{icon}</span>}
      {text && <span>{text}</span>}
    </div>
  );

  const buttonClass = clsx(baseButton, className);

  return (
    <button type={type} disabled={disabled} className={buttonClass} {...props}>
      {buttonContent}
    </button>
  );
}

CircleButton.defaultProps = {
  disabled: false,
  type: 'button',
  className: '',
};

export default CircleButton;
