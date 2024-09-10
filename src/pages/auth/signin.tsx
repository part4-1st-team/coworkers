import { useRouter } from 'next/router';
import { useState } from 'react';
import AuthInput from '@/components/input/authInput';
import { useForm, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';
import login from '@/services/Auth.API';

type FormValues = {
  email: string;
  password: string;
};

/**
 * 테스트 계정
 * {
  "email": "test1234@testuser.com",
  "nickname": "test user",
  "password": "Test1234!",
  "passwordConfirmation": "Test1234!"
}
*/
function SignInPage() {
  const router = useRouter();
  const { control, handleSubmit } = useForm<FormValues>();
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { email, password } = data;

    try {
      // 로그인 API 요청
      const response = await login({ email, password });
      localStorage.setItem('accessToken', response.accessToken);
      // 로그인 성공 시 리다이렉트 (아무 페이지 테스트)
      router.push('/board/index.tsx');
    } catch (err: unknown) {
      // 에러 처리
      if (err instanceof Error) {
        setError(err.message || '이메일 또는 비밀번호가 잘못되었습니다.');
      }
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-transparent'>
      <div className='w-full max-w-md bg-transparent p-8 rounded-md shadow-md'>
        <h2 className='block text-40 text-text-primary text-center font-500 h-48 mb-80 leading-48'>
          로그인
        </h2>
        {error && <div className='text-text-primary mb-4'>{error}</div>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-24 text-text-primary'>
            이메일
            <AuthInput
              type='email'
              name='email'
              control={control}
              placeholder='이메일을 입력하세요.'
              className='mt-12 border-background-secondary'
            />
          </div>
          <div className='text-text-primary'>
            비밀번호
            <AuthInput
              type='password'
              name='password'
              control={control}
              placeholder='비밀번호를 입력하세요.'
              className='flex align-center mt-12 border-background-secondary'
            />
          </div>
          <button
            type='submit'
            className='w-full mt-40 bg-interaction-focus text-text-primary py-14 rounded-12'
          >
            로그인
          </button>
          <span className='flex justify-center gap-12 text-text-primary font-500 w-full mt-24'>
            <p>아직 계정이 없으신가요?</p>
            <p className='text-interaction-focus underline decoration-interaction-focus'>
              가입하기
            </p>
          </span>
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
    </div>
  );
}

export default SignInPage;
