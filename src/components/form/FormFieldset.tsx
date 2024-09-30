import { ReactNode } from 'react';
import Label from './Label';

interface FieldsetProps {
  id: string;
  label: string;
  children: ReactNode;
}

function FormFieldSet({ children, id, label }: FieldsetProps) {
  return (
    <div className='flex flex-col gap-12'>
      <Label id={id}>{label}</Label>
      {children}
    </div>
  );
}

export default FormFieldSet;
