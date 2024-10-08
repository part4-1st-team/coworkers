import React from 'react';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';
import AuthInput from '@/components/input/authInput';
import { signup } from '@/services/Auth.API';
import { yupResolver } from '@hookform/resolvers/yup';
import signUpSchema from '@/schema/signUpSchema';
import useToast from '@/components/toast/useToast';
import Button from '@/components/button/button';
import {
  GOOGLE_REDIRECT_URI,
  GOOGLE_CLIENT_ID,
  KAKAO_REDIRECT_URI,
  KAKAO_CLIENT_ID,
} from '@/constants/authConstants';

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
  const { toast } = useToast();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: yupResolver(signUpSchema),
    mode: 'onChange',
  });

  // 회원가입 데이터 전송
  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    try {
      const response = await signup(data);
      toast('Success', response);
      router.push('/auth/signIn');
    } catch (error) {
      toast('Error', '회원가입 실패');
    }
  };

  // 카카오 로그인 요청 URL
  const handleKakaoLogin = () => {
    const loginUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${encodeURIComponent(String(KAKAO_REDIRECT_URI!))}`;
    window.location.href = loginUrl;
  };

  // 구글 로그인 요청 URL
  const handleGoogleLogin = () => {
    const loginUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(GOOGLE_REDIRECT_URI)}&scope=email%20profile`;
    window.location.href = loginUrl;
  };

  return (
    <div className='flex justify-center items-center bg-background-primary dark:bg-background-primary-dark text-text-primary dark:text-text-primary-dark tablet:mx-142 tablet:mt-160 desktop:mx-430 desktop:mt-160 mt-84'>
      <div className='w-480'>
        <h1 className='block w-139 text-40 leading-48 font-500 mx-auto mb-80'>
          회원가입
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-24'
        >
          <div>
            이름
            <AuthInput
              name='nickname'
              type='text'
              placeholder='이름을 입력해주세요.'
              control={control}
              className='flex align-middle mt-12'
            />
            {errors.nickname && (
              <span className='text-status-danger text-sm'>
                {errors.nickname.message}
              </span>
            )}
          </div>
          <div>
            이메일
            <AuthInput
              name='email'
              type='text'
              placeholder='이메일을 입력해주세요.'
              control={control}
              className='flex align-middle mt-12'
            />
            {errors.email && (
              <span className='text-status-danger text-sm'>
                {errors.email.message}
              </span>
            )}
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
            {errors.password && (
              <span className='text-status-danger text-sm'>
                {errors.password.message}
              </span>
            )}
          </div>
          <div>
            비밀번호 확인
            <AuthInput
              name='passwordConfirmation'
              type='password'
              placeholder='비밀번호를 다시 한 번 입력해주세요.'
              control={control}
              className='flex align-middle mt-12 mb-16'
            />
            {errors.passwordConfirmation && (
              <span className='text-status-danger text-sm'>
                {errors.passwordConfirmation.message}
              </span>
            )}
          </div>
          <Button type='submit' color='primary' size='lg' className='w-full'>
            회원가입
          </Button>
        </form>
        <div className='flex items-center border-border-primary mt-24 mb-16'>
          <div className='flex-grow border-t border-border-primary dark:border-border-primary-dark' />
          <div className='border-border-primary dark:border-border-primary-dark text-text-primary dark:text-text-primary-dark mx-24'>
            OR
          </div>
          <div className='flex-grow border-t border-border-primary dark:border-border-primary-dark' />
        </div>
        <div className='flex justify-between mt-16'>
          <span className='text-text-primary dark:text-text-primary-dark'>
            간편 로그인하기
          </span>
          <div className='flex gap-16'>
            <button type='button' onClick={handleKakaoLogin}>
              <Image
                src='/images/img_kakaotalk.png'
                alt='간편 로그인 카카오톡'
                width={42}
                height={42}
              />
            </button>
            <button type='button' onClick={handleGoogleLogin}>
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

export default SignUpPage;
