import Button from '@/components/button/button';
import Input from '@/components/input/input';
import useModalStore from '@/stores/ModalStore';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { sendResetPasswordEmail } from '@/services/Auth.API';
import Modal from './Modal';

interface FormState {
  email: string;
}

function PasswordResetModal() {
  const { control, handleSubmit } = useForm<FormState>();
  const { setModalClose } = useModalStore();

  // 이메일 발송 로직
  const handleSendLink: SubmitHandler<FormState> = async (data) => {
    try {
      await sendResetPasswordEmail(
        data.email,
        'https://coworkers.vercel.app/reset-password',
      );
      alert('비밀번호 재설정 링크가 발송되었습니다.');
    } catch (error) {
      console.error('이메일 발송 실패:', error);
      alert('이메일 발송에 실패했습니다.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleSendLink)}
      className='px-36 pt-32 flex flex-col items-center'
    >
      <Modal.Title title='비밀번호 재설정' />
      <Modal.Description description='비밀번호 재설정 링크를 보내드립니다.' />

      <div className='w-full'>
        <Controller
          name='email'
          control={control}
          render={({ field }) => (
            <Input
              placeholder='이메일을 입력하세요'
              {...field}
              className='w-full h-48 tablet:min-w-280 mt-16 mb-24'
            />
          )}
        />
      </div>

      <Modal.Buttons>
        <Button
          type='button'
          color='white'
          className='w-full'
          onClick={setModalClose}
        >
          닫기
        </Button>
        <Button type='submit' color='primary' className='w-full'>
          링크 보내기
        </Button>
      </Modal.Buttons>
    </form>
  );
}

export default PasswordResetModal;
