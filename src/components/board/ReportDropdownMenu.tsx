import Dropdown from '@/components/dropdown/Dropdown';
import { IconKebabSmall } from '@/assets/IconList';
import useDropdown from '@/hooks/useDropdown';
import useToast from '../toast/useToast';

function ReportDropdownMenu() {
  const { isOpen, handleToggleDropdown, handleOffDropdown } = useDropdown();
  const { toast } = useToast();
  const onReport = () => {
    toast('Success', '신고가 접수되었습니다.');
  };

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
