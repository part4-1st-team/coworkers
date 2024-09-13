import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';
import AuthInput from '@/components/input/authInput';
import { signup } from '@/services/Auth.API';

interface SignUpFormValues {
  nickname: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

/** 테스트 계정
 * id : sin1234@test.com
 * password : Sin1234!
 * nickname : 짱구
 */
function SignUpPage() {
  const { control, handleSubmit } = useForm<SignUpFormValues>();

  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    try {
      // eslint-disable-next-line no-console
      console.log('회원가입 요청 데이터:', data);
      const response = await signup(data); // API 호출 변경
      // eslint-disable-next-line no-console
      console.log('회원가입 성공:', response);
      // 성공 시 추가 처리
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('회원가입 실패:', error);
    }
  };

  return (
    <div className='w-480 hh-516 text-text-primary'>
      <h1 className='block w-139 h-48 text-text-primary text-40 leading-48 font-500 mx-auto mb-80'>
        회원가입
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-24'>
        <div className='h-79'>
          이름
          <AuthInput
            name='nickname'
            type='text'
            placeholder='이름을 입력해주세요.'
            control={control}
            className='mt-12'
          />
        </div>
        <div>
          이메일
          <AuthInput
            name='email'
            type='email'
            placeholder='이메일을 입력해주세요.'
            control={control}
            className='mt-12'
          />
        </div>
        <div>
          비밀번호
          <AuthInput
            name='password'
            type='password'
            placeholder='비밀번호를 입력해주세요.'
            control={control}
            className='flex align-middle mt-12'
          />
        </div>
        <div>
          비밀번호 확인
          <AuthInput
            name='passwordConfirmation'
            type='password'
            placeholder='비밀번호를 다시 한 번 입력해주세요.'
            control={control}
            className='flex align-middle mt-12'
          />
        </div>
        <button
          type='submit'
          className='w-full h-47 rounded-12 px-14 py-auto bg-icon-brand mt-40 mb-48'
        >
          회원가입
        </button>
      </form>
      <div className='flex items-center'>
        <div className='flex-grow border-t border-border-primary' />
        <div className='border-white mx-24 text-white'>OR</div>
        <div className='flex-grow border-t border-border-primary' />
      </div>
      <div className='flex justify-between mt-16'>
        <span className='text-text-primary'>간편 로그인하기</span>
        <div className='flex gap-16'>
          <button type='button'>
            <Image
              src='/images/img_kakaotalk.png'
              alt='간편 로그인 카카오톡'
              width={42}
              height={42}
            />
          </button>
          <button type='button'>
            <Image
              src='/images/img_google.png'
              alt='간편 로그인 구글'
              width={42}
              height={42}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
