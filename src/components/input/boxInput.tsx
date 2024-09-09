/* eslint-disable react/no-unknown-property */
/* eslint-disable react/require-default-props */
interface BoxInputProps {
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}

function BoxInput({
  className = '',
  placeholder = '내용을 입력해 주세요',
  value = '',
  onChange,
  rows = 3,
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
        className={`py-[12px] px-[16px] w-full text-text-inverse bg-background-secondary rounded-12 border border-border-primary hover:border-interaction-hover resize-none focus:outline-none focus:border-interaction-focus focus:ring-0 ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
      />
    </div>
  );
}

export default BoxInput;
