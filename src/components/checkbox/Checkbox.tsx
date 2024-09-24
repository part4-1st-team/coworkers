import { IconCheckboxActive, IconCheckboxDefault } from '@/assets/IconList';

interface CheckboxProps {
  checked: boolean;
  handleClick: (e: any) => void;
}

function Checkbox({ handleClick, checked }: CheckboxProps) {
  return (
    <button type='button' onClick={handleClick}>
      {checked ? <IconCheckboxActive /> : <IconCheckboxDefault />}
    </button>
  );
}

export default Checkbox;
