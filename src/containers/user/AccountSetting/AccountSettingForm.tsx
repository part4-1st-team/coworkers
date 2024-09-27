import Button from '@/components/button/button';
import FormFieldSet from '@/components/form/FormFieldset';
import Input from '@/components/input/input';
import ModifyProfile from '@/components/member/modifyProfile';
import ProfileImage from '@/components/member/ProfileImage';
import useToast from '@/components/toast/useToast';
import useImageMutation from '@/hooks/useImageMutation';
import useUser from '@/hooks/useUser';
import { patchUser } from '@/services/userAPI';
import useUserStore from '@/stores/userStore';
import { PatchUserType } from '@/types/userAPIType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import LoginIcon from './LoginIcon';

interface AccountSettingFormState {
  name: string;
  email: string;
  password: string;
}

function AccountSettingForm() {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const [currentImage, setCurrentImage] = useState<Blob | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { control, handleSubmit } = useForm<AccountSettingFormState>();

  const imageMutation = useImageMutation();
  const { user, isLoading: isUserLoading } = useUser();

  //   const { isSocialLogin } = useUserStore();

  const isSocialLogin: 'kakao' | 'google' | null = 'kakao';

  const updateUserMutation = useMutation({
    mutationFn: async (name: string) => {
      const data: PatchUserType = {};

      if (currentImage !== null) {
        const formData = new FormData();
        formData.append('image', currentImage);
        const uploadedImage = await imageMutation.mutateAsync(currentImage);
        data.image = uploadedImage.url;
      }

      if (user?.nickname !== name) {
        data.nickname = name;
      }

      return patchUser(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
      toast('Success', '프로필이 업데이트되었습니다.');
    },
    onError: () => {
      toast('Error', '프로필 업데이트에 실패했습니다.');
    },
  });

  const handleChangeUser: SubmitHandler<AccountSettingFormState> = (data) => {
    const { name } = data;

    // TODO 이미지 변경 후 프리뷰 변경되지 않는 부분 수정하기
    updateUserMutation.mutateAsync(name);
  };

  useEffect(() => {
    if (user) setPreview(user.image);
  }, [user]);

  if (!user)
    return (
      <section className='flex flex-col gap-24'>
        <div className='flex gap-20'>
          <ProfileImage userImage={null} size={64} />
          <div className='flex flex-col gap-10 justify-center'>
            <p className='text-2lg font-semibold text-text-primary dark:text-text-primary-dark'>
              이메일
            </p>

            <LoginIcon loginType={null} />
          </div>
        </div>
        <form
          onSubmit={handleSubmit(handleChangeUser)}
          className='flex flex-col gap-[24px]'
        >
          <FormFieldSet id='name' label='이름'>
            <Input id='name' type='text' disabled />
          </FormFieldSet>

          <Button color='primary' type='submit' disabled>
            변경하기
          </Button>
        </form>
      </section>
    );

  const { email, nickname, image } = user;

  return (
    <section className='flex flex-col gap-24'>
      <div className='flex gap-20'>
        <ModifyProfile
          preview={preview}
          setImage={setCurrentImage}
          setPreview={setPreview}
        />
        <div className='flex flex-col gap-10 justify-center'>
          <p className='text-2lg font-semibold text-text-primary dark:text-text-primary-dark'>
            이메일
          </p>
          <p className='text-lg font-semibold text-text-secondary dark:text-text-secondary-dark flex gap-10 items-center'>
            {email} <LoginIcon loginType={isSocialLogin} />
          </p>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(handleChangeUser)}
        className='flex flex-col gap-[24px]'
      >
        <FormFieldSet id='name' label='이름'>
          <Controller
            name='name'
            control={control}
            defaultValue={nickname}
            render={({ field }) => <Input id='name' type='text' {...field} />}
          />
        </FormFieldSet>

        <Button color='primary' type='submit' disabled={isUserLoading}>
          변경하기
        </Button>
      </form>
    </section>
  );
}

export default AccountSettingForm;
