interface TitleEditInputProps {
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // 수정
}

function TitleEditInput({
  className = '',
  placeholder = '제목을 수정하세요',
  value = '',
  onChange,
}: TitleEditInputProps) {
  return (
    <div className='w-full'>
      <input
        className={`w-full text-text-primary dark:text-text-primary-dark resize-none focus:outline-none focus:ring-0 ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{ backgroundColor: 'transparent' }}
      />
    </div>
  );
}

export default TitleEditInput;
