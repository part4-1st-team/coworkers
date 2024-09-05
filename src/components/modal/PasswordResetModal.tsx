import useModalStore from '@/stores/ModalStore';
import { SubmitHandler, useForm } from 'react-hook-form';
import ModalDescription from './ModalDescription';
import ModalPortal from './ModalPortal';
import ModalTitle from './ModalTitle';

interface FormState {
  email: string;
}

function PasswordResetModal() {
  const { register, handleSubmit } = useForm<FormState>();
  const { setModalClose } = useModalStore();

  const handleSendLink: SubmitHandler<FormState> = (data) => {
    // NOTE: 링크 보내는 로직 작성, alert 제거
    alert(JSON.stringify(data));
  };

  return (
    <ModalPortal>
      <form
        onSubmit={handleSubmit(handleSendLink)}
        className='px-[36px] pt-[32px] flex flex-col items-center'
      >
        <ModalTitle title='비밀번호 재설정' />
        <ModalDescription description='비밀번호 재설정 링크를 보내드립니다.' />

        <input
          placeholder='이메일을 입력하세요'
          className='w-[280px] h-[48px] mt-[16px] mb-[24px] bg-background-secondary border-solid border-white border rounded-[12px] p-[12px]'
          {...register('email')}
        />

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
            링크 보내기
          </button>
        </div>
      </form>
    </ModalPortal>
  );
}

export default PasswordResetModal;
