import clsx from 'clsx';
import { useState } from 'react';

interface PickerProps {
  text: string;
  value: number;
  onClick: (value: number) => void;
  className?: string;
}

function PickerButton({ text, value, onClick, className }: PickerProps) {
  const [isChecked, setisChecked] = useState<boolean>(false);
  return (
    <button
      type='button'
      onClick={() => {
        setisChecked((prev) => !prev);
        onClick(Number(value));
      }}
      value={value}
      className={clsx(
        'w-44 h-48 rounded-12 py-8 px-10 bg-background-primary dark:bg-background-primary-dark text-text-default dark:text-text-default-dark text-md font-medium',
        isChecked
          ? 'bg-brand-primary dark:bg-brand-primary-dark text-text-primary dark:text-text-primary-dark'
          : 'bg-button-background text-text-default dark:text-text-default-dark',
        className,
      )}
    >
      {text}
    </button>
  );
}
export default PickerButton;
