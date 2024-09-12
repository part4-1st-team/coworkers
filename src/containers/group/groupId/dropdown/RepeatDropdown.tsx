import Dropdown from '@/components/dropdown/Dropdown';
import DropdownList from '@/components/dropdown/DropdownList';
import useDropdown from '@/hooks/useDropdown';
import RepeatButton from './RepeatButton';

function RepeatDropdown({
  frequency,
  handleClick,
}: {
  frequency: FrequencyType;
  handleClick: any;
}) {
  const { handleOffDropdown, handleToggleDropdown, isOpen } = useDropdown();

  return (
    <Dropdown onClose={handleOffDropdown}>
      <Dropdown.Trigger onClick={handleToggleDropdown}>
        <RepeatButton value={frequency} />
      </Dropdown.Trigger>
      <Dropdown.Menu isOpen={isOpen} position='top-48' className='w-109'>
        <DropdownList
          onClose={handleOffDropdown}
          onClick={() => handleClick('ONCE')}
        >
          한 번
        </DropdownList>
        <DropdownList
          onClose={handleOffDropdown}
          onClick={() => handleClick('DAILY')}
        >
          매일
        </DropdownList>
        <DropdownList
          onClose={handleOffDropdown}
          onClick={() => handleClick('WEEKLY')}
        >
          주 반복
        </DropdownList>
        <DropdownList
          onClose={handleOffDropdown}
          onClick={() => handleClick('MONTHLY')}
        >
          월 반복
        </DropdownList>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default RepeatDropdown;
