/* eslint-disable react/require-default-props */
import clsx from 'clsx';
import { useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import EnterButton from '../button/enterButton';

interface ReplyInputProps {
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  disabled?: boolean;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

function ReplyInput({
  className = '',
  placeholder = '댓글을 달아주세요',
  value = '',
  onChange,
  rows = 1,
  disabled,
  onKeyDown,
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
    <div className='py-13 border-y border-y-border-primary dark:border-y-border-primary-dark flex items-center'>
      <div className='w-full flex gap-[8px]'>
        <textarea
          ref={textareaRef}
          className={twMerge(
            'w-full text-text-primary dark:text-text-primary-dark min-h-17 max-h-300 resize-none focus:outline-none focus:ring-0',
            className,
          )}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          rows={rows}
          onKeyPress={onKeyDown}
          //   onKeyUp={onKeyDown}
          style={{
            backgroundColor: 'transparent',
          }}
        />
        <EnterButton disabled={disabled} />
      </div>
    </div>
  );
}

export default ReplyInput;
