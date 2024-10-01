import passwordSchema from '@/schema/PasswordSchema';
import { patchUserPassword } from '@/services/userAPI';
import useModalStore from '@/stores/ModalStore';
import { PatchPassword } from '@/types/userAPIType';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ErrorLabel from '../form/errorMessage';
import AuthInput from '../input/authInput';

import Label from '../form/Label';
import useToast from '../toast/useToast';

interface PasswordChangeFormState {
  password: string;
  passwordConfirmation: string;
}

interface FormProps {
  submitButton: ReactNode;
  type: 'modal' | 'page';
  formClass?: string;
}

function PasswordChangeForm({ submitButton, type, formClass = '' }: FormProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PasswordChangeFormState>({
    resolver: yupResolver(passwordSchema),
    mode: 'onChange',
  });
  const { toast } = useToast();
  const { setModalClose } = useModalStore();
  const router = useRouter();

  const { token } = router.query; // URL에서 token 추출

  useEffect(() => {
    if (!token) {
      // 비밀번호 변경 페이지로 리디렉션
      router.push('/reset-password');
    }
  }, [token]);

  const passwordChangeMutation = useMutation({
    mutationFn: (data: PatchPassword) => patchUserPassword(data),
    onSuccess: () => {
      if (type === 'modal') setModalClose();
      else router.push('/');
      toast('Success', '비밀번호가 변경되었습니다.');
    },
    onError: () => toast('Error', '비밀번호 변경에 실패했습니다.'),
  });

  const handleChangePassword: SubmitHandler<PasswordChangeFormState> = (
    data,
  ) => {
    passwordChangeMutation.mutate(data);
  };

  // 조건부 클래스
  const labelGap = clsx({
    'gap-8': type === 'modal',
    'gap-12': type === 'page',
  });

  const inputGap = clsx({
    'gap-16': type === 'modal',
    'gap-24': type === 'page',
  });

  const btnMarginBottom = clsx({
    'mb-8': type === 'modal',
    'mb-16': type === 'page',
  });

  return (
    <form
      onSubmit={handleSubmit(handleChangePassword)}
      className={clsx('flex flex-col items-center', inputGap, formClass)}
    >
      <div className={clsx('flex flex-col w-full', labelGap)}>
        <Label id='password'>새 비밀번호</Label>

        <AuthInput
          control={control}
          type='password'
          name='password'
          error={!!errors.password}
          placeholder={
            type === 'modal'
              ? '새 비밀번호를 입력해주세요'
              : '비밀번호 (영문, 숫자 포함, 12자 이내)를 입력해주세요.'
          }
          className={clsx('w-full h-48 tablet:min-w-280')}
        />
        <ErrorMessage
          errors={errors}
          name='password'
          render={({ message }) => <ErrorLabel message={message} />}
        />
      </div>
      <div className={clsx('flex flex-col w-full', labelGap, btnMarginBottom)}>
        <Label id='passwordConfirmation'>새 비밀번호 확인</Label>
        <AuthInput
          control={control}
          type='password'
          name='passwordConfirmation'
          placeholder='새 비밀번호를 다시 한 번 입력해주세요'
          className='w-full h-48 tablet:min-w-280'
          error={!!errors.passwordConfirmation}
        />
        <ErrorMessage
          errors={errors}
          name='passwordConfirmation'
          render={({ message }) => <ErrorLabel message={message} />}
        />
      </div>
      {submitButton}
    </form>
  );
}

export default PasswordChangeForm;
