import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react'; // 모달 상태를 관리하기 위해 추가
import AuthInput from '@/components/input/authInput';
import PasswordResetModal from '@/components/modal/PasswordResetModal'; // 모달 컴포넌트 import
import { yupResolver } from '@hookform/resolvers/yup';
import passwordSchema from '@/schema/PasswordSchema';

interface PasswordResetFormValues {
  password: string;
  passwordConfirmation: string;
}

function PasswordResetPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetFormValues>({
    resolver: yupResolver(passwordSchema),
    mode: 'onChange',
  });
  const [isModalOpen, setModalOpen] = useState(false); // 모달 상태 추가

  const onSubmit: SubmitHandler<PasswordResetFormValues> = async () => {
    setModalOpen(true); // 모달 열기
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
            error={!!errors.password}
          />
          {/* 에러 메시지 출력 */}
          {errors.password && (
            <p className='text-status-danger text-sm mt-1'>
              {errors.password.message}
            </p>
          )}
        </div>
        <div>
          비밀번호 확인
          <AuthInput
            type='password'
            name='passwordConfirmation'
            control={control}
            placeholder='새 비밀번호를 다시 한번 입력해주세요.'
            className='flex justify-center align-middle'
            error={!!errors.password}
          />
          {/* 에러 메시지 출력 */}
          {errors.passwordConfirmation && (
            <p className='text-status-danger text-sm mt-1'>
              {errors.passwordConfirmation.message}
            </p>
          )}
        </div>
        <button
          type='submit'
          className='w-full h-47 bg-icon-brand rounded-12 font-600 leading-19 mt-40'
        >
          재설정
        </button>
      </form>
      {isModalOpen && <PasswordResetModal />} {/* 모달 렌더링 */}
    </div>
  );
}

export default PasswordResetPage;
