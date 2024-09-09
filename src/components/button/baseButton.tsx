import clsx from 'clsx';

type ColorType = 'primary' | 'outlined' | 'red' | 'bgNon';
type ButtonType = 'button' | 'submit' | 'reset'; // 추가적인 버튼 타입

interface BaseButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  color?: ColorType;
  disabled?: boolean;
  type?: ButtonType; // 선택적 속성으로 수정
  text: string; // 텍스트만 받는 방식
  className?: string; // 추가적인 커스텀 클래스 네임
}

function BaseButton({
  color,
  text,
  type = 'button', // 기본값 설정
  disabled = false,
  className,
  ...props
}: BaseButtonProps) {
  const baseButton =
    'w-full text-md font-semibold text-text-inverse px-12 py-7.5 bg-brand-primary flex items-center justify-center rounded-12 hover:bg-interaction-hover focus:outline-none focus:bg-interaction-pressed disabled:bg-interaction-inactive  ';

  const colorStyle = {
    primary: 'bg-brand-primary',
    white:
      'bg-background-inverse text-brand-primary border border-border-primary hover:text-interaction-hover hover:border hover:border-interaction-hover active:borer-interaction-pressed active:text-interaction-pressed disabled:bg-interaction-inactive',
    red: 'bg-status-danger text-text-inverse',
    outline:
      'px-8 bg-none text-brand-primary border border-brand-primary hover:border hover:border-interaction-hover hover:text-interaction-hover active:text-interaction-pressed  disabled:border-interaction-inactive',
  };

  const buttonClass = clsx(baseButton, colorStyle, className);

  return (
    // eslint-disable-next-line react/button-has-type
    <button type={type} disabled={disabled} {...props} className={buttonClass}>
      {text}
    </button>
  );
}

BaseButton.defaultProps = {
  color: 'primary',
  disabled: false,
  type: 'button',
  className: '',
};

export default BaseButton;
