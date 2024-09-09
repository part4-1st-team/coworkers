import { useState } from 'react';
import Button from '@/components/button/button';
import clsx from 'clsx';

function RadioButton() {
  // 버튼의 활성화 상태를 관리하는 상태 변수
  const [isActive, setIsActive] = useState(false);

  // 클릭 시 버튼의 활성화 상태를 토글하는 핸들러
  const handleClick = () => {
    setIsActive((pre) => !pre);
  };

  return (
    <Button
      type='button'
      rounded
      className='bg-background-secondary w-[28px] h-[28px] border border-icon-primary p-0 '
      onClick={handleClick}
    >
      <div
        className={clsx(
          'w-3 h-3 rounded-full',
          isActive
            ? 'bg-icon-brand w-[12px] h-[12px]'
            : 'bg-background-secondary w-[12px] h-[12px]',
        )}
      />
    </Button>
  );
}

export default RadioButton;
