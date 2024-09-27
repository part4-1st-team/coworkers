import { ReactNode } from 'react';

function Label({ id, children }: { id: string; children: ReactNode }) {
  return (
    <label
      htmlFor={id}
      className='text-text-primary text-text-primary dark:text-text-primary-dark text-lg font-medium '
    >
      {children}
    </label>
  );
}

export default Label;
