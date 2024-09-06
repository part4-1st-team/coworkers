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
    'p-3.5  rounded-xl bg-gray-100 bg-background-secondary border-background-secondary text-text-primary font-font-normal';
  const placeholderClasses = 'placeholder-text-default text-lg py-3.5 pl-4';
  const focusClasses =
    'focus:border-intersection-focus border focus:outline-none';

  // 조건부 클래스
  const hoverClasses = !props.disabled
    ? 'hover:border-intersection-hover border hover:outline-none'
    : '';
  const errorClasses = errorMessage ? '!border-status-danger border' : '';
  const disabledClasses = props.disabled
    ? 'cursor-not-allowed placeholder-text-disabled focus:outline-none'
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

/*
 * `Input` 컴포넌트는 텍스트 입력 필드를 렌더링합니다.
 *
 * ## 기능
 * - 레이블 텍스트와 에러 메시지를 지원합니다.
 * - 필드가 전체 너비를 차지하도록 설정할 수 있습니다.
 * - 입력 필드의 스타일은 다양한 상태에 따라 변경됩니다.
 *
 * ## 조건부 스타일
 * - **비활성화 상태**: `cursor-not-allowed`, `placeholder-text-disabled`
 * - **포커스 상태**: `focus:border-intersection-focus`, `focus:outline-none`
 * - **호버 상태**: `hover:border-intersection-hover`
 * - **에러 상태**: `!border-status-danger`, `border`
 *
 * ## 사용 방법
 *
 * ```tsx
 * <Input
 *   id="input-id"
 *   label="입력 레이블"
 *   errorMessage="입력 오류 메시지"
 *   fullWidth={true}
 *   placeholder="플레이스홀더 텍스트"
 *   className="추가적인 클래스명"
 *   {...props}
 * />
 * ```
 *
 * ## Props
 *
 * - `label`: 필드의 레이블을 설정합니다.
 * - `errorMessage`: 에러 메시지를 설정합니다.
 * - `fullWidth`: 필드가 전체 너비를 차지하도록 설정합니다.
 * - `className`: 추가적인 클래스명을 설정합니다.
 */
