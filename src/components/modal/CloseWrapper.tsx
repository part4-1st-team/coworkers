// 닫기 버튼이 있는 div를 따로 컴포넌트로 분리
// CloseWrapper라는 이름이 직관적이지는 않은거 같아서 추천부탁드립니다~

import { IconX } from '@/assets/IconList';
import useModalStore from '@/stores/ModalStore';
import { clsx } from 'clsx';
import { ReactNode } from 'react';

function CloseWrapper({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const { setModalClose } = useModalStore();

  return (
    <div className={clsx('relative', className)}>
      <IconX
        className='absolute right-0 top-0 cursor-pointer'
        onClick={setModalClose}
      />

      {children}
    </div>
  );
}

export default CloseWrapper;
