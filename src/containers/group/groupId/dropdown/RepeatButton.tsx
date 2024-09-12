import { IconToggleDown } from '@/assets/IconList';
import getDaily from '@/utils/getDaily';

function RepeatButton({ value }: { value: string | null }) {
  return (
    <button
      type='button'
      className='flex items-center w-109 h-44 py-10 px-12 gap-8 rounded-12 bg-dropdown-button text-text-default text-md font-medium'
    >
      {value ? getDaily(value) : '반복 안함'}
      <IconToggleDown className='fill-text-default' />
    </button>
  );
}

export default RepeatButton;
