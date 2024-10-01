import { useRef, useLayoutEffect } from 'react';
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
  rows = 10,
  onCancel,
  onSave,
}: EditInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 텍스트가 변경될 때마다 텍스트 영역의 높이를 조정하는 로직
  useLayoutEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // 높이 초기화
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 400)}px`; // 높이 설정
    }
  }, [value]); // value가 바뀔 때마다 실행

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (textareaRef.current) {
      // 높이를 auto로 설정하여 초기화
      textareaRef.current.style.height = 'auto';
      // scrollHeight를 기준으로 높이 설정
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 400)}px`;
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
            overflowY: 'auto',
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
