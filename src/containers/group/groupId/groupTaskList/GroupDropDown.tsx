import { IconKebabLarge, IconGear } from '@/assets/IconList';
import Dropdown from '@/components/dropdown/Dropdown';
import useDropdown from '@/hooks/useDropdown';

function GroupDropDown({
  handleEdit,
  handleDelete,
  icon,
}: {
  handleEdit: () => void;
  handleDelete: () => void;
  icon: string;
}) {
  const { isOpen, handleOffDropdown, handleToggleDropdown } = useDropdown();

  return (
    <Dropdown onClose={handleOffDropdown}>
      <Dropdown.Trigger onClick={handleToggleDropdown}>
        {icon === 'kebab' ? (
          <IconKebabLarge className='cursor-pointer' />
        ) : (
          <IconGear className='cursor-pointer fill-text-default' />
        )}
      </Dropdown.Trigger>
      <Dropdown.Menu isOpen={isOpen} position='right-0'>
        <Dropdown.List onClose={handleOffDropdown} onClick={handleEdit}>
          수정하기
        </Dropdown.List>
        <Dropdown.List onClose={handleOffDropdown} onClick={handleDelete}>
          삭제하기
        </Dropdown.List>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default GroupDropDown;
