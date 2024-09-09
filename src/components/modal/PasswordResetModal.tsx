import Button from '@/components/button/button';
import Input from '@/components/input/input';
import useModalStore from '@/stores/ModalStore';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Modal from './Modal';

interface FormState {
  email: string;
}

function PasswordResetModal() {
  const { control, handleSubmit } = useForm<FormState>();
  const { setModalClose } = useModalStore();

  const handleSendLink: SubmitHandler<FormState> = (data) => {
    // NOTE: 링크 보내는 로직 작성, alert 제거
    alert(JSON.stringify(data));
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
