import { useState } from 'react';
import Button from '@/components/button/button';
import Input from '@/components/input/input';
import useModalStore from '@/stores/ModalStore';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import instance from '@/libs/axios';
import Modal from './Modal';

interface FormState {
  email: string;
}

function PasswordResetModal() {
  const { control, handleSubmit } = useForm<FormState>();
  const { setModalClose } = useModalStore();
  const [loading, setLoading] = useState(false);

  const handleSendLink: SubmitHandler<FormState> = async (data) => {
    setLoading(true);
    try {
      const response = await instance.post('/user/send-reset-password-email', {
        email: data.email,
        redirectUrl: 'http://localhost:3000/user/password-change',
      });

      if (response.status === 200) {
        alert('비밀번호 재설정 링크가 이메일로 전송되었습니다.');
        setModalClose(); // 이메일 전송이 완료되면 모달 닫기
      } else {
        alert('서버에서 문제가 발생했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      alert('이메일 전송 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
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
        <Button
          type='submit'
          color='primary'
          className='w-full'
          disabled={loading}
        >
          {loading ? '전송 중' : '링크 보내기'}
        </Button>
      </Modal.Buttons>
    </form>
  );
}

export default PasswordResetModal;
