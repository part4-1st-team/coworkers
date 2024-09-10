import { IconKebabSmall } from '@/assets/IconList';
import Dropdown from '@/components/dropdown/Dropdown';
import useDropdown from '@/hooks/useDropdown';

function KebabDropdown({
  handleEdit,
  handleDelete,
}: {
  handleEdit: () => void;
  handleDelete: () => void;
}) {
  const { isOpen, handleOffDropdown, handleToggleDropdown } = useDropdown();

  return (
    <Dropdown onClose={handleOffDropdown}>
      <Dropdown.Trigger onClick={handleToggleDropdown}>
        <IconKebabSmall className='cursor-pointer' />
      </Dropdown.Trigger>
      <Dropdown.Menu isOpen={isOpen} position='right-0'>
        <Dropdown.List onClose={handleOffDropdown} onClick={handleEdit}>
          수정
        </Dropdown.List>
        <Dropdown.List onClose={handleOffDropdown} onClick={handleDelete}>
          삭제
        </Dropdown.List>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default KebabDropdown;
