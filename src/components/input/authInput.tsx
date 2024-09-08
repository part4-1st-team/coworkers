/* eslint-disable react/require-default-props */
/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { IconVisibilityOff, IconVisibilityOn } from '@/assets/IconList';
import Input from './input';

interface AuthInputProps {
  control: UseFormReturn['control'];
  name: string;
  type: 'password' | 'email';
  errorMessage?: string;
  className?: string;
  placeholder?: string; // 플레이스홀더 프롭 추가
}

function AuthInput({
  control,
  name,
  type,
  errorMessage,
  className = '',
  placeholder = '', // 플레이스홀더 기본값 설정
}: AuthInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className='relative'>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <div className='relative '>
              <Input
                type={
                  type === 'password'
                    ? isPasswordVisible
                      ? 'text'
                      : 'password'
                    : type
                }
                className={`w-full py-[10.5px] px-[16px]  ${errorMessage ? 'border-status-danger border' : ''} ${className}`}
                placeholder={placeholder} // 플레이스홀더 전달
                {...field}
                style={{ color: '#64748B' }}
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
                </p> // 에러 메시지 표시
              )}
            </div>
          </>
        )}
      />
    </div>
  );
}

export default AuthInput;
