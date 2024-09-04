import useModalStore from '@/stores/ModalStore';
import { SubmitHandler, useForm } from 'react-hook-form';
import ModalPortal from './ModalPortal';
import ModalTitle from './ModalTitle';

interface FormState {
  password: string;
  passwordRepeat: string;
}

function PasswordChangeModal() {
  const { register, handleSubmit } = useForm<FormState>();
  const { setModalClose } = useModalStore();

  const handleChangePassword: SubmitHandler<FormState> = (data) => {
    // NOTE: 비밀번호 변경 로직 작성
    alert(JSON.stringify(data));
  };

  return (
    <ModalPortal>
      <form
        className='pt-[32px] px-[36px] flex flex-col items-center gap-[16px]'
        onSubmit={handleSubmit(handleChangePassword)}
      >
        <ModalTitle title='비밀번호 변경하기' />

        <div className='flex flex-col gap-[8px]'>
          <span className='text-lg font-medium text-text-primary'>
            새 비밀번호
          </span>
          <input
            placeholder='새 비밀번호를 입력해주세요'
            className='w-[280px] h-[48px] bg-background-secondary border-solid border-white border rounded-[12px] p-[12px]'
            {...register('password')}
          />
        </div>

        <div className='flex flex-col gap-[8px]  mb-[8px]'>
          <span className='text-lg font-medium text-text-primary'>
            새 비밀번호 확인
          </span>
          <input
            placeholder='새 비밀번호를 다시 한 번 입력해주세요'
            className='w-[280px] h-[48px] bg-background-secondary border-solid border-white border rounded-[12px] p-[12px]'
            {...register('passwordRepeat')}
          />
        </div>

        <div className='flex items-center gap-[8px]'>
          <button
            type='button'
            className='bg-white rounded-[12px] text-brand-primary w-[136px] h-[48px]'
            onClick={setModalClose}
          >
            닫기
          </button>
          <button
            type='submit'
            className='bg-brand-primary rounded-[12px] w-[136px] h-[48px] text-white'
          >
            변경하기
          </button>
        </div>
      </form>
    </ModalPortal>
  );
}

export default PasswordChangeModal;
