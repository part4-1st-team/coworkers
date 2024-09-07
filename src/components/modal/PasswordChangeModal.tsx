import Input from '@/components/input/input';
import useModalStore from '@/stores/ModalStore';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Button from '../button/button';
import ModalTitle from './ModalTitle';

interface FormState {
  password: string;
  passwordRepeat: string;
}

function PasswordChangeModal() {
  const { control, handleSubmit } = useForm<FormState>();
  const { setModalClose } = useModalStore();

  const handleChangePassword: SubmitHandler<FormState> = (data) => {
    // NOTE: 비밀번호 변경 로직 작성
    alert(JSON.stringify(data));
  };

  return (
    <form
      className='pt-32 px-36 flex flex-col items-center gap-16'
      onSubmit={handleSubmit(handleChangePassword)}
    >
      <ModalTitle title='비밀번호 변경하기' />

      <div className='flex flex-col gap-8 w-full'>
        <span className='text-lg font-medium text-text-primary'>
          새 비밀번호
        </span>

        <Controller
          name='password'
          control={control}
          render={({ field }) => (
            <Input
              placeholder='새 비밀번호를 입력해주세요'
              {...field}
              className='w-full h-48 tablet:min-w-280'
            />
          )}
        />
      </div>

      <div className='flex flex-col gap-8 mb-8 w-full'>
        <span className='text-lg font-medium text-text-primary'>
          새 비밀번호 확인
        </span>
        <Controller
          name='passwordRepeat'
          control={control}
          render={({ field }) => (
            <Input
              placeholder='새 비밀번호를 다시 한 번 입력해주세요'
              {...field}
              className='w-full h-48 tablet:min-w-280'
            />
          )}
        />
      </div>

      <div className='flex items-center gap-8 w-full'>
        <Button
          type='button'
          color='white'
          onClick={setModalClose}
          className='w-full'
        >
          닫기
        </Button>
        <Button type='submit' color='primary' className='w-full'>
          변경하기
        </Button>
      </div>
    </form>
  );
}

export default PasswordChangeModal;
