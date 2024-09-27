import Dropdown from '@/components/dropdown/Dropdown';
import { IconKebabSmall } from '@/assets/IconList';
import useDropdown from '@/hooks/useDropdown';

interface ReportDropdownMenuProps {
  onReport: () => void; // 신고하기 기능을 위한 함수
}

function ReportDropdownMenu({ onReport }: ReportDropdownMenuProps) {
  const { isOpen, handleToggleDropdown, handleOffDropdown } = useDropdown();

  return (
    <Dropdown onClose={handleOffDropdown}>
      <Dropdown.Trigger onClick={handleToggleDropdown}>
        <IconKebabSmall />
      </Dropdown.Trigger>
      <Dropdown.Menu isOpen={isOpen} className='right-10'>
        <Dropdown.List onClose={handleOffDropdown} onClick={onReport}>
          신고하기
        </Dropdown.List>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ReportDropdownMenu;
