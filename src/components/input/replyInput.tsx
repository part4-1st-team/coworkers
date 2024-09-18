/* eslint-disable react/require-default-props */
import { useRef } from 'react';
import EnterButton from '../button/enterButton';

interface ReplyInputProps {
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  onClick?: () => void;
}

function ReplyInput({
  className = '',
  placeholder = '댓글을 달아주세요',
  value = '',
  onChange,
  rows = 1,
  onClick,
}: ReplyInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    if (onChange) onChange(e);
  };

  return (
    <div className='py-[13px] border-y border-y-background-tertiary flex items-center'>
      <div className='w-full flex gap-[8px]'>
        <textarea
          ref={textareaRef}
          className={`w-full text-text-inverse resize-none focus:outline-none focus:ring-0 ${className}`}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          rows={rows}
          style={{
            minHeight: '17',
            maxHeight: '300',
            backgroundColor: 'transparent',
          }}
        />
        <EnterButton />
      </div>
    </div>
  );
}

export default ReplyInput;
