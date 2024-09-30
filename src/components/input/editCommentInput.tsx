/* eslint-disable react/require-default-props */
import { useRef } from 'react';
import Button from '@/components/button/button';

interface EditInputProps {
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  onCancel?: () => void;
  onSave?: () => void;
}

function EditInput({
  className = '',
  placeholder = '댓글을 달아주세요',
  value = '',
  onChange,
  rows = 1,
  onCancel,
  onSave,
}: EditInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    if (onChange) onChange(e);
  };

  return (
    <div className='py-[16px] border-b border-b-background-tertiary dark:border-b-background-tertiary-dark flex items-center'>
      <div className='w-full'>
        <textarea
          ref={textareaRef}
          className={`w-full text-text-primary dark:text-text-primary-dark resize-none focus:outline-none focus:ring-0 ${className}`}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          rows={rows}
          style={{
            minHeight: '17px',
            maxHeight: '400px',
            backgroundColor: 'transparent',
          }}
        />
        <div className='flex gap-8 justify-end items-center'>
          <Button
            type='button'
            className='text-text-default dark:text-text-default-dark font-semibold hover:text-text-tertiary dark: active:text-text-inverse'
            onClick={onCancel}
          >
            취소
          </Button>
          <Button
            color='outline'
            type='button'
            className='w-74 h-32 px-1 py-6'
            onClick={onSave}
          >
            수정하기
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditInput;
