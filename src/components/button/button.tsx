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
    'font-semibold inline-flex items-center justify-center font-semibold p-3.5 ';

  /* 컬러에 따른 분기  */
  const colorStyle = {
    primary:
      'bg-brand-primary text-text-inverse hover:bg-intersection-hover active:bg-intersection-pressed',
    white:
      'bg-background-inverse text-brand-primary border border-border-primary hover:text-intersection-hover hover:border hover:border-intersection-hover active:borer-intersection-pressed  active:text-intersection-pressed',
    red: 'bg-status-danger text-text-inverse',
    outline:
      'bg-none text-border-primary border border-border-primary hover:border hover:border-intersection-hover hover:text-intersection-hover active:text-intersection-pressed',
  };

  /* 디스에이블에 따른 스타일 분기 */
  const disabledColorStyle = {
    primary: 'bg-intersection-inactive cursor-not-allowed text-text-inverse',
    white:
      'text-intersection-inactive cursor-not-allowed bg-background-inverse',
    outline:
      'border border-intersection-inactive text-intersection-inactive cursor-not-allowed',
    red: '',
  };

  // 텍스트 사이즈에 따른 스타일 분기
  const sizeStyle = {
    lg: 'text-lg leading-lg',
    md: 'text-md leading-md',
    sm: 'text-sm leading-sm',
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
    <button {...props} className={buttonClass}>
      <span
        className={clsx('flex items-center', icon && children ? 'gap-2' : '')}
      >
        {icon && <span className='icon'>{icon}</span>}
        {children && <span className='text'>{children}</span>}
      </span>
    </button>
  );
}

Button.defaultProps = {
  color: '',
  icon: false,
  size: 'md',
  rounded: null,
  disabled: false,
  className: '',
};

export default Button;

/**
 * `Button` 컴포넌트
 *
 * 사용 방법:
 *
 * 기본적인 버튼으로 아이콘, 텍스트, 색상, 사이즈 등을 조정할 수 있습니다.
 *
 * Props:
 * - `type`: 필수. 버튼의 타입을 정의합니다. ('button' 또는 'submit')
 * - `color`: 버튼의 색상을 선택할 수 있습니다. ('primary', 'white', 'red', 'outline')
 * - `icon`: 버튼에 추가할 아이콘 (ReactNode 형식으로 전달)
 * - `size`: 텍스트 크기를 정의합니다. ('lg', 'md', 'sm')
 * - `rounded`: true일 경우 버튼의 모서리가 둥글게 처리됩니다.
 * - `disabled`: 버튼을 비활성화 시킬 수 있습니다.
 * - `className`: 추가적인 Tailwind CSS 클래스를 적용할 수 있습니다.
 *
 * 예시:
 *
 * 1. 기본적인 버튼 사용:
 * ```tsx
 * <Button type='button' color='primary'>
 *   확인
 * </Button>
 * ```
 *
 * 2. 아이콘이 있는 버튼:
 * ```tsx
 * <Button type='button' color='primary' icon={<YourIcon />}>
 *   확인
 * </Button>
 * ```
 *
 * 3. 사이즈가 큰 버튼:
 * ```tsx
 * <Button type='button' size='lg' color='red'>
 *   경고
 * </Button>
 * ```
 *
 * 4. 비활성화 버튼:
 * ```tsx
 * <Button type='submit' color='primary' disabled>
 *   제출
 * </Button>
 * ```
 */
