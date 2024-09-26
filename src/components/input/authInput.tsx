import { IconVisibilityOff, IconVisibilityOn } from '@/assets/IconList';
import clsx from 'clsx';
import { useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import Input from './input';

interface AuthInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  type: 'password' | 'email' | 'text';
  error?: boolean;
  className?: string;
  placeholder?: string;
}

function AuthInput<T extends FieldValues>({
  control,
  name,
  type,
  error,
  className = '',
  placeholder = '',
}: AuthInputProps<T>) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const inputType = () => {
    if (type === 'password') {
      return isPasswordVisible ? 'text' : 'password';
    }
    return type;
  };

  return (
    <div className='relative'>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className='relative'>
            <Input
              type={inputType()}
              className={clsx(
                'w-full py-11 px-16',
                className,
                error && 'border-1 border-red',
              )}
              error={error}
              placeholder={placeholder}
              {...field}
            />
            {type === 'password' && (
              <button
                type='button'
                onClick={togglePasswordVisibility}
                className='absolute inset-y-0 right-0 px-16'
              >
                {isPasswordVisible ? (
                  <IconVisibilityOn />
                ) : (
                  <IconVisibilityOff />
                )}
              </button>
            )}
          </div>
        )}
      />
    </div>
  );
}

export default AuthInput;
