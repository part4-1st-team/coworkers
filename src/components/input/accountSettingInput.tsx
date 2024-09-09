/* eslint-disable react/require-default-props */
import { Controller, UseFormReturn } from 'react-hook-form';
import Button from '@/components/button/button';
import Input from './input';

interface AccountSettingInputProps {
  control: UseFormReturn['control'];
  name: string;
  type: 'password' | 'email';
  className?: string;
  placeholder?: string;
  onClick?: () => void;
}

function AccountSettingInput({
  control,
  name,
  type,
  className = '',
  placeholder = '',
  onClick,
}: AccountSettingInputProps) {
  return (
    <div className='relative'>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className='relative'>
            <Input
              type={type === 'password' ? 'password' : 'text'}
              className={`w-full h-48 py-[10.5px] px-[16px] border border-border-primary bg-background-tertiary hover:border-border-primary focus:border-border-primary ${className}`}
              placeholder={placeholder}
              {...field}
              style={{ color: '#94A3B8' }}
            />
            {type === 'password' && (
              <div className=''>
                <Button
                  type='button'
                  color='primary'
                  className='w-74 h-32 px-12.5 py-6 absolute inset-y-8 right-16'
                  onClick={onClick}
                >
                  변경하기
                </Button>
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
}

export default AccountSettingInput;
