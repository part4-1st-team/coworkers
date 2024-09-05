import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  fullWidth?: boolean;
  className?: string;
}

function Input({
  label = '',
  errorMessage,
  fullWidth = false,
  className,
  ...props
}: InputProps) {
  // 기본 클래스들
  const baseClasses =
    'p-3.5 rounded-xl bg-gray-100 bg-background-secondary border-background-secondary';
  const placeholderClasses = 'placeholder-text-default text-lg py-3.5 pl-4';
  const focusClasses =
    'focus:border-intersection-focus border focus:outline-none';
  const hoverClasses =
    'hover:border-intersection-hover border hover:outline-none';

  // 조건부 클래스
  const errorClasses = errorMessage ? '!border-status-danger border' : '';
  const disabledClasses = props.disabled
    ? 'cursor-not-allowed placeholder-text-disabled'
    : '';

  // 전체 클래스명 생성
  const classNames = clsx(
    baseClasses,
    placeholderClasses,
    focusClasses,
    hoverClasses,
    errorClasses,
    disabledClasses,
    className,
  );

  return (
    <div className={clsx('flex flex-col', { 'w-full': fullWidth })}>
      {/* 라벨이 있을경우 */}
      {label && (
        <label
          htmlFor={props.id}
          className='text-lg font-semibold text-text-primary mb-2'
        >
          {label}
        </label>
      )}
      {/* 외부에서 disabled상태 전달되면 disable 적용됩니다 */}
      {/* hight값은 className 프롭으로 지정해 줍니다 */}
      <input
        id={props.id}
        disabled={props.disabled}
        className={classNames}
        {...props}
      />
      {/* 에러메세지가 전달되면 에러메세지가 생성됩니다  */}
      {errorMessage && (
        <p className='text-md font-semibold text-status-danger mt-2'>
          {errorMessage}
        </p>
      )}
    </div>
  );
}

Input.defaultProps = {
  label: '',
  errorMessage: '',
  fullWidth: false,
  className: '',
};

export default Input;
