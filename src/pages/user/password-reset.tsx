import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router'; // Token을 URL에서 가져오기 위함
import { resetPassword } from '@/services/Auth.API';
import AuthInput from '@/components/input/authInput';

interface PasswordResetFormValues {
  password: string;
  passwordConfirmation: string;
}

function PasswordResetPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetFormValues>();
  const router = useRouter();
  const { token } = router.query; // URL에서 token을 가져옴

  const onSubmit: SubmitHandler<PasswordResetFormValues> = async (data) => {
    if (!token) {
      console.error('토큰이 없습니다.');
      return;
    }

    try {
      const response = await resetPassword({
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
        token: token as string,
      });
      console.log('비밀번호 재설정 성공:', response.message);
      // 비밀번호 재설정 성공 후 추가 로직 (예: 로그인 페이지로 리다이렉션)
    } catch (error) {
      console.error('비밀번호 재설정 실패:', error);
    }
  };

  return (
    <div className='w-460 h-397 text-text-primary'>
      <h1 className='block text-40 text-center font-500 leading-48 mb-80 mx-auto'>
        비밀번호 재설정
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-24'>
        <div className='font-500 leading-19'>
          새 비밀번호
          <AuthInput
            type='password'
            name='password'
            control={control}
            placeholder='비밀번호 (영문, 숫자 포함, 12자 이내)를 입력해주세요.'
            className='flex justify-center align-middle'
            errorMessage={errors.password?.message}
          />
        </div>
        <div>
          비밀번호 확인
          <AuthInput
            type='password'
            name='passwordConfirmation'
            control={control}
            placeholder='새 비밀번호를 다시 한번 입력해주세요.'
            className='flex justify-center align-middle'
            errorMessage={errors.passwordConfirmation?.message}
          />
        </div>
        <button
          type='submit'
          className='w-full h-47 bg-icon-brand rounded-12 font-600 leading-19 mt-40'
        >
          재설정
        </button>
      </form>
    </div>
  );
}

export default PasswordResetPage;
