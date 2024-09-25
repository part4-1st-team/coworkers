import clsx from 'clsx';

type Type = 'button' | 'submit';
type ColorType = 'primary' | 'white' | 'red' | 'outline';
type TextSizeType = 'lg' | 'md' | 'sm';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type: Type; // 버튼의 타입 ('button' or 'submit')
  color?: ColorType; // 버튼의 색상 스타일
  icon?: React.ReactNode; // 버튼 내부에 들어갈 아이콘 (ReactNode로 전달 가능)
  size?: TextSizeType; // 버튼 텍스트 크기 ('lg', 'md', 'sm')
  rounded?: boolean; // 버튼 모서리를 둥글게 할지 여부
  disabled?: boolean; // 버튼 비활성화 여부
  className?: string; // 추가적인 커스텀 클래스 네임
  children: React.ReactNode; // 버튼 안에 들어갈 내용 (텍스트 또는 아이콘 등)
}

function Button({
  children,
  icon,
  type,
  color,
  size = 'md',
  rounded = false,
  disabled,
  className,
  ...props
}: ButtonProps) {
  const baseButton =
    'font-semibold inline-flex  items-center justify-center  px-15 py-15';

  /* 컬러에 따른 분기  */
  const colorStyle = {
    primary:
      'px-5 bg-brand-primary text-text-inverse  hover:bg-interaction-hover active:bg-interaction-pressed disabled:bg-interaction-inactive',
    white:
      'bg-background-inverse text-brand-primary border border-border-primary hover:text-interaction-hover hover:border hover:border-interaction-hover active:borer-interaction-pressed active:text-interaction-pressed disabled:bg-interaction-inactive',
    red: 'bg-status-danger hover:bg-status-danger-hover active:bg-status-danger-active text-text-inverse',
    outline:
      'px-8 bg-none text-brand-primary border border-brand-primary hover:border hover:border-interaction-hover hover:text-interaction-hover active:text-interaction-pressed  disabled:border-interaction-inactive',
  };

  /* 디스에이블에 따른 스타일 분기 */
  const disabledColorStyle = {
    primary: 'bg-interaction-inactive cursor-not-allowed text-text-inverse',
    white: 'text-interaction-inactive cursor-not-allowed bg-background-inverse',
    outline:
      'border border-interaction-inactive text-interaction-inactive cursor-not-allowed',
    red: '',
  };

  // 텍스트 사이즈에 따른 스타일 분기
  const sizeStyle = {
    lg: 'text-lg',
    md: 'text-md',
    sm: 'text-sm',
  };

  const roundedStyle = rounded ? 'rounded-full' : 'rounded-xl';

  const buttonClass = clsx(
    baseButton,
    !disabled ? colorStyle[color!] : disabledColorStyle[color!],
    roundedStyle,
    sizeStyle[size],
    className,
  );

  return (
    // eslint-disable-next-line react/button-has-type
    <button type={type} {...props} className={buttonClass}>
      <span
        className={clsx('flex items-center', icon && children ? 'gap-8' : '')}
      >
        {icon && <span className='icon'>{icon}</span>}
        {children && <span className='text'>{children}</span>}
      </span>
    </button>
  );
}

export default Button;
