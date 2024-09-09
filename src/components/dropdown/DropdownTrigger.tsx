import { ReactNode } from 'react';

/**
 * @param children 트리거 안에 위치할 요소
 * @param onClick 드롭다운을 열기 위한 Click 함수
 * @returns 드롭다운을 열기 위한 트리거 버튼
 */
function DropdownTrigger({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button type='button' onClick={onClick}>
      {children}
    </button>
  );
}

export default DropdownTrigger;
