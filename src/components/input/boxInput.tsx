/* eslint-disable react/no-unknown-property */
/* eslint-disable react/require-default-props */
interface BoxInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  error?: boolean;
}

function BoxInput({
  className = '',
  placeholder = '내용을 입력해 주세요',
  rows = 3,
  error,
  ...props
}: BoxInputProps) {
  return (
    <div>
      <textarea
        className={`py-12 px-16 w-full text-text-primary dark:text-text-primary-dark bg-background-secondary dark:bg-background-secondary-dark placeholder-text-default dark:placeholder-text-default-dark placeholder-text-lg font-normal rounded-12 border border-border-primary dark:border-border-primary-dark hover:border-interaction-hover dark:hover:border-interaction-hover resize-none focus:outline-none focus:border-interaction-focus dark:focus:border-interaction-focu focus:ring-0 ${className}`}
        placeholder={placeholder}
        rows={rows}
        {...props} // props로 전달받은 register의 value와 onChange 처리
      />
      {error && (
        <span className='text-status-danger'>오류가 발생했습니다.</span>
      )}
    </div>
  );
}

export default BoxInput;
