import useDetectClose from '@/hooks/useDetectClose';
import clsx from 'clsx';
import { ReactNode } from 'react';
import DropdownList from './DropdownList';
import DropdownMenu from './DropdownMenu';
import DropdownTrigger from './DropdownTrigger';

/**
 *
 * @param children 드롭다운 내부 요소
 * @param onClose 드롭다운을 닫기 위한 함수
 * @param className (선택) 추가적인 클래스 네임
 * @returns 드롭다운 반환
 * 
 * @example
 * const { handleOffDropdown, isOpen, handleToggleDropdown, handleSetValue } =
    useDropdown();
 *
 * <Dropdown onClose={handleOffDropdown} className='m-48'>
      <Dropdown.Trigger onClick={handleToggleDropdown}>
        <IconKebabLarge />
      </Dropdown.Trigger>
      <Dropdown.Menu isOpen={isOpen}>
        <Dropdown.List onClick={() => console.log('자유게시판')}>
          자유게시판
        </Dropdown.List>
        <Dropdown.List onClick={() => console.log('로그아웃')}>
          로그아웃
        </Dropdown.List>
      </Dropdown.Menu>
    </Dropdown>
 */
function Dropdown({
  children,
  onClose,
  className = '',
}: {
  children: ReactNode;
  onClose: () => void;
  className?: string;
}) {
  const dropdownRef = useDetectClose(onClose);

  return (
    <div ref={dropdownRef} className={clsx('relative', className)}>
      {children}
    </div>
  );
}

Dropdown.Trigger = DropdownTrigger;
Dropdown.Menu = DropdownMenu;
Dropdown.List = DropdownList;

export default Dropdown;
