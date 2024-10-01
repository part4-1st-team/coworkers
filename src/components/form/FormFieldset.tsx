import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import Label from './Label';

interface FieldsetProps {
  id: string;
  label: string;
  children: ReactNode;
  className?: string;
}

function FormFieldSet({ children, id, label, className }: FieldsetProps) {
  return (
    <div className={twMerge('flex flex-col gap-12', className)}>
      <Label id={id}>{label}</Label>
      {children}
    </div>
  );
}

export default FormFieldSet;
