import { twMerge } from 'tailwind-merge';

interface CheckboxProps {
  checked: boolean;
  handleClick: (e: any) => void;
}

function Checkbox({ handleClick, checked }: CheckboxProps) {
  return (
    <input
      onClick={handleClick}
      type='checkbox'
      className={twMerge(
        'appearance-none size-16 rounded-4 border border-border-primary shadow-md dark:border-border-priamry-dark',
        'checked:bg-brand-primary checked:border-0',
        `checked:bg-[url('/svgs/ic_check.svg')] bg-no-repeat bg-center`,
        'focus:outline-none focus:ring-offset-0 focus:ring-1 focus:ring-brand-secondary',
        'hover:shadow-[0_8px_20px_rgba(93,115,232,0.5)]',
      )}
      checked={checked}
    />
  );
}

export default Checkbox;
