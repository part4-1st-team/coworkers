import Dropdown from '@/components/dropdown/Dropdown';
import { IconKebabSmall } from '@/assets/IconList';
import useDropdown from '@/hooks/useDropdown';

interface BoardDropdownMenuProps {
  onEdit: () => void; // 수정하기 기능을 위한 함수
  onDelete: () => void; // 삭제하기 기능을 위한 함수
}

function BoardDropdownMenu({ onEdit, onDelete }: BoardDropdownMenuProps) {
  const { isOpen, handleToggleDropdown, handleOffDropdown } = useDropdown();

  return (
    <Dropdown onClose={handleOffDropdown}>
      <Dropdown.Trigger onClick={handleToggleDropdown}>
        <IconKebabSmall />
      </Dropdown.Trigger>
      <Dropdown.Menu isOpen={isOpen} className='right-10'>
        <Dropdown.List onClick={onEdit}>수정하기</Dropdown.List>
        <Dropdown.List onClick={onDelete}>삭제하기</Dropdown.List>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default BoardDropdownMenu;
