import { useForm, SubmitHandler } from 'react-hook-form';
import AuthInput from '@/components/input/authInput';

function PasswordResetPage() {
  const { control, handleSubmit } = useForm<SignUpFormValues>();
  return (
    <div className='w-460 h-397 text-text-primary'>
      <h1 className='block text-40 text-center font-500 leading-48 mb-80 mx-auto'>
        비밀번호 재설정
      </h1>
      <div className='flex flex-col gap-24'>
        <div className='font-500 leading-19'>
          새 비밀번호
          <AuthInput
            type='password'
            name='password'
            control={control}
            placeholder='비밀번호 (영문, 숫자 포함, 12자 이내)를 입력해주세요.)'
            className='flex justify-center align-middle'
          />
        </div>
        <div>
          비밀번호 확인
          <AuthInput
            type='password'
            name='password'
            control={control}
            placeholder='새 비밀번호를 다시 한번 입력해주세요.'
            className='flex justify-center align-middle'
          />
        </div>
      </div>
      <button
        type='button'
        className='w-full h-47 bg-icon-brand rounded-12 font-600 leading-19 mt-40'
      >
        재설정
      </button>
    </div>
  );
}

export default PasswordResetPage;
