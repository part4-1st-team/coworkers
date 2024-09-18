import { useState } from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { IconVisibilityOff, IconVisibilityOn } from '@/assets/IconList';
import Input from './input';

interface AuthInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  type: 'password' | 'email' | 'text';
  errorMessage?: string;
  className?: string;
  placeholder?: string;
}

function AuthInput<T extends FieldValues>({
  control,
  name,
  type,
  errorMessage,
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
          <>
            <div className='relative'>
              <Input
                type={inputType()}
                className={`w-full py-[10.5px] px-[16px]  ${
                  errorMessage ? 'border-status-danger border' : ''
                } ${className}`}
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

            <div>
              {errorMessage && (
                <p className='text-md font-semibold text-status-danger mt-8'>
                  {errorMessage}
                </p>
              )}
            </div>
          </>
        )}
      />
    </div>
  );
}

export default AuthInput;
