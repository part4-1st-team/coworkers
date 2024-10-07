import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import AuthInput from '@/components/input/authInput';
import { useForm, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';
import login from '@/services/Auth.API';
import { isAxiosError } from 'axios';
import useUserStore from '@/stores/userStore';
import Link from 'next/link';
import useModalStore from '@/stores/ModalStore';
import PasswordResetModal from '@/components/modal/PasswordResetModal';
import Button from '@/components/button/button';
import signInSchema from '@/schema/signInSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  GOOGLE_REDIRECT_URI,
  KAKAO_REDIRECT_URI,
  KAKAO_CLIENT_ID,
  GOOGLE_CLIENT_ID,
} from '@/constants/authConstants';

type FormValues = {
  email: string;
  password: string;
};

function SignInPage() {
  const router = useRouter();
  const { user } = useUserStore();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(signInSchema) });
  const [error, setError] = useState<string | null>(null);
  const { setLogin } = useUserStore(); // 로그인 상태 저장
  const { setModalOpen } = useModalStore(); // 비밀번호 재설정 링크 모달 상태

  // 컴포넌트 마운트 시 로그인 상태 체크
  useEffect(() => {
    if (user) {
      router.push('/'); // 이미 로그인된 경우 홈 페이지로 리다이렉트
    }
  }, [user, router]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { email, password } = data;

    try {
      // 로그인 API 요청
      const response = await login({ email, password });
      const { user: loggedInUser, accessToken, refreshToken } = response;
      // 유저 정보 저장, 쿠키에 토큰 저장
      setLogin(loggedInUser, accessToken, refreshToken, null);
      // 에러 메시지 초기화
      setError(null);
      // 로그인 성공 시 그룹 페이지로 이동
      router.push('/groups');
    } catch (err: unknown) {
      // 에러 처리
      if (isAxiosError(err)) {
        const errorMessage =
          err.response?.data?.message || '서버 통신 중 오류가 발생했습니다.';
        setError(errorMessage);
      } else if (err instanceof Error) {
        // 일반 에러 처리
        setError(err.message || '예기치 못한 오류 발생');
      } else {
        // 예상치 못한 예외 처리
        setError('알 수 없는 오류 발생');
      }
    }
  };

  // 임의의 state 값 생성 함수 (CSRF 방지용)
  const generateState = () => {
    return Math.random().toString(36).substring(2);
  };

  // 카카오 로그인 요청 URL
  const handleKakaoLogin = () => {
    const state = generateState();
    const loginUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${encodeURIComponent(KAKAO_REDIRECT_URI)}&state=${state}`;
    window.location.href = loginUrl;
  };

  // 구글 로그인 요청 URL
  const handleGoogleLogin = () => {
    const state = generateState();
    const loginUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(GOOGLE_REDIRECT_URI)}&scope=email%20profile&state=${state}`;
    window.location.href = loginUrl;
  };

  // 비밀번호 재설정 모달 핸들러
  const handleOpenPasswordResetModal = () => {
    setModalOpen(<PasswordResetModal />);
  };

  return (
    <div className='flex justify-center items-center bg-transparent tablet:mx-142 tablet:mt-160 desktop:mx-430 desktop:mt-200 mt-84'>
      <div className='w-full max-w-md bg-transparent p-8 rounded-md'>
        <h2 className='block text-40 text-text-primary dark:text-text-primary-dark text-center font-500 h-48 mb-80 leading-48'>
          로그인
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-24 text-text-primary dark:text-text-primary-dark'>
            이메일
            <AuthInput
              type='text'
              name='email'
              control={control}
              placeholder='이메일을 입력하세요.'
              className='mt-12 border-background-secondary'
              error={!!errors.email}
            />
            {errors && (
              <p className='text-status-danger text-sm mt-8'>
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className='text-text-primary dark:text-text-primary-dark'>
            비밀번호
            <AuthInput
              type='password'
              name='password'
              control={control}
              placeholder='비밀번호를 입력하세요.'
              className='flex align-center mt-12 border-background-secondary'
              error={!!errors.password}
            />
            {errors && (
              <p className='text-status-danger text-sm mt-8'>
                {errors.password?.message}
              </p>
            )}
          </div>
          <div className='mb-40'>
            <button
              type='button'
              onClick={handleOpenPasswordResetModal}
              className='text-right w-full h-24 mt-1'
            >
              <span className='block text-interaction-focus dark:text-interaction-focus-dark underline decoration-interaction-focus'>
                비밀번호를 잊으셨나요?
              </span>
            </button>
          </div>
          {error && (
            <div className='text-status-danger text-md text-center h-35 rounded-5 pl-5 -mt-24 mb-8'>
              {' '}
              {/* 에러 창 디자인 논의 필요 */}
              입력하신 이메일 또는 비밀번호가 올바르지 않습니다. <br />
              다시 시도해 주세요.
            </div>
          )}
          <Button type='submit' color='primary' size='lg' className='w-full'>
            로그인
          </Button>
          <span className='flex justify-center gap-12 text-text-primary dark:text-text-primary-dark font-500 w-full mt-24 mb-16'>
            <p>아직 계정이 없으신가요?</p>
            <Link
              href='/auth/signup'
              className='text-interaction-focus underline decoration-interaction-focus'
            >
              가입하기
            </Link>
          </span>
        </form>
        <div className='flex items-center'>
          <div className='flex-grow border-t border-border-primary dark:border-border-primary-dark' />
          <div className='border-border-primary dark:border-border-primary-dark mx-24 text-text-primary dark:text-text-primary-dark'>
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

export default SignInPage;
