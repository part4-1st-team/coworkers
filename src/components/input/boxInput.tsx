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
      <style jsx>{`
        textarea::-webkit-scrollbar {
          width: 5px;
        }
        textarea::-webkit-scrollbar-thumb {
          background-color: #334155;
          border-radius: 4px;
          border: 7px solid #334155;
        }
        textarea::-webkit-scrollbar-thumb:hover {
          background-color: #555;
        }
      `}</style>

      <textarea
        className={`py-12 px-16 w-full text-text-inverse dark:text-text-inverse-dark bg-background-secondary dark:bg-background-secondary-dark placeholder-text-default dark:placeholder-text-default-dark placeholder-text-lg font-normal rounded-12 border border-border-primary dark:border-border-primary-dark hover:border-interaction-hover resize-none focus:outline-none focus:border-interaction-focus focus:ring-0 ${className}`}
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
