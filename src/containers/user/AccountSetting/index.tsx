import Button from '@/components/button/button';
import Input from '@/components/input/input';
import ModifyProfile from '@/components/member/modifyProfile';
import useToast from '@/components/toast/useToast';
import useImageMutation from '@/hooks/useImageMutation';
import { patchUser } from '@/services/userAPI';
import { PatchUserType } from '@/types/userAPIType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import useUser from '@/hooks/useUser';
import ChangePasswordButton from './ChangePasswordButton';
import UserSecessionButton from './UserSecessionButton';

interface FormState {
  name: string;
  email: string;
  password: string;
}

function AccountSetting() {
  const { toast } = useToast();

  const [currentImage, setCurrentImage] = useState<Blob | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { control, handleSubmit } = useForm<FormState>();
  const queryClient = useQueryClient();

  // const { user } = useUserStore();
  const { user } = useUser();

  const imageMutation = useImageMutation();

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

  const handleChangeUser: SubmitHandler<FormState> = (data) => {
    const { name } = data;

    // TODO 이미지 변경 후 프리뷰 변경되지 않는 부분 수정하기
    updateUserMutation.mutateAsync(name);
  };

  useEffect(() => {
    if (user) setPreview(user.image);
  }, [user]);

  if (!user) return null;

  const { email, nickname, image } = user;

  return (
    <main className='main-container'>
      <div className='flex flex-col gap-24'>
        <h2 className='text-xl font-bold text-text-primary'>계정 설정</h2>

        <ModifyProfile
          preview={preview}
          setImage={setCurrentImage}
          setPreview={setPreview}
        />
        <form
          onSubmit={handleSubmit(handleChangeUser)}
          className='flex flex-col gap-[24px]'
        >
          {/* TODO input들 defaultValue 변경 */}
          <Controller
            name='name'
            control={control}
            defaultValue={nickname}
            render={({ field }) => <Input type='text' {...field} />}
          />
          <Controller
            name='email'
            control={control}
            defaultValue={email}
            render={({ field }) => <Input disabled type='text' {...field} />}
          />

          <Button color='primary' type='submit'>
            변경하기
          </Button>
        </form>
        <div className='flex justify-between'>
          <UserSecessionButton />
          <ChangePasswordButton />
        </div>
      </div>
    </main>
  );
}

export default AccountSetting;
