import clsx from 'clsx';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

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
      className={twMerge(
        'w-44 h-48 rounded-12 py-8 px-10 bg-background-primary dark:bg-background-primary-dark text-md font-medium',
        isChecked
          ? 'bg-brand-primary dark:bg-brand-primary text-text-primary-dark'
          : 'dark:bg-button-background text-text-default dark:text-text-default-dark',

        className,
      )}
    >
      {text}
    </button>
  );
}
export default PickerButton;
