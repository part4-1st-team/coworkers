import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * 추가적인 커스텀 클래스 네임을 설정합니다.
   */
  className?: string;

  /**
   * 입력 필드에 포함할 자식 노드를 설정합니다.
   */
  children?: React.ReactNode;
}

/**
 * `Input` 컴포넌트는 기본적인 입력 필드를 렌더링하며, 다양한 스타일과 상태를 지원합니다.
 *
 * @param {InputProps} props - 입력 필드의 속성
 * @returns {JSX.Element} 렌더링된 입력 필드 요소
 *
 * @example
 * ```tsx
 * <Input
 *   id="username"
 *   placeholder="Enter your username"
 *   disabled={false}
 *   className="custom-class"
 * />
 * ```
 */
function Input({ children, className = '', ...props }: InputProps) {
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

  // 전체 클래스명 생성
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
      id={props.id}
      disabled={props.disabled}
      className={classNames}
      {...props}
    />
  );
}

// 기본 속성값 설정
Input.defaultProps = {
  className: '',
  children: '',
};

export default Input;
