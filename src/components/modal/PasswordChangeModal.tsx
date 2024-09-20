import Input from '@/components/input/input';
import { patchUserPassword } from '@/services/userAPI';
import useModalStore from '@/stores/ModalStore';
import { PatchPassword } from '@/types/userAPIType';
import { useMutation } from '@tanstack/react-query';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Button from '../button/button';
import useToast from '../toast/useToast';
import Modal from './Modal';

interface FormState {
  password: string;
  passwordConfirmation: string;
}

function PasswordChangeModal() {
  const { control, handleSubmit } = useForm<FormState>();
  const { setModalClose } = useModalStore();
  const { toast } = useToast();

  const passwordChangeMutation = useMutation({
    mutationFn: (data: PatchPassword) => patchUserPassword(data),
    onSuccess: () => {
      setModalClose();
      toast('Success', '비밀번호가 변경되었습니다.');
    },
    onError: () => toast('Error', '비밀번호 변경에 실패했습니다.'),
  });

  const handleChangePassword: SubmitHandler<FormState> = (data) => {
    // TODO 비밀번호 유효성 검사 로직 추가하기
    // TODO AUth 인풋으로 변경하기
    // TODO input 라벨 추가하기
    passwordChangeMutation.mutate(data);
  };

  return (
    <form
      className='pt-32 px-36 flex flex-col items-center gap-16'
      onSubmit={handleSubmit(handleChangePassword)}
    >
      <Modal.Title title='비밀번호 변경하기' />

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
          name='passwordConfirmation'
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

      <Modal.Buttons>
        <Button
          type='button'
          color='white'
          onClick={setModalClose}
          className='w-136 flex-1'
        >
          닫기
        </Button>
        <Button type='submit' color='primary' className='w-136 flex-1'>
          변경하기
        </Button>
      </Modal.Buttons>
    </form>
  );
}

export default PasswordChangeModal;
