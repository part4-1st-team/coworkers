import Button from '@/components/button/button';
import ImgUpload from '@/components/imgUpload/ImgUpload';
import Input from '@/components/input/input';
import useToast from '@/components/toast/useToast';
import { postGroup } from '@/services/GroupAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

interface FormState {
  name: string;
}

function CreateGroup() {
  const { toast } = useToast();
  const { control, handleSubmit } = useForm<FormState>();
  const [groupName, setGroupName] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const router = useRouter();

  const createGroupMutation = useMutation({
    mutationFn: async (name: string) => {
      const data: PostGroupRequest = { name: '' };

      data.name = name;
      data.image = imgUrl;

      return postGroup(data);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ['group'],
      });
      toast('Success', '팀 생성에 성공했습니다.');
      router.push(`/group/${response.id}`);
    },
    onError: () => {
      if (!groupName) {
        toast('Error', '팀 이름을 입력해주세요.');
      }
      toast('Error', '팀 생성에 실패했습니다.');
    },
  });

  const handleCreateGroup: SubmitHandler<FormState> = (data) => {
    const { name } = data;

    createGroupMutation.mutateAsync(name);
  };

  return (
    <div className='main-container '>
      <div className='mx-16 tablet:mx-142 desktop:mx-430 mt-132 text-lg text-text-primary'>
        <div className='w-full flex flex-col items-center gap-24'>
          <div className='text-4xl'>팀 생성하기</div>
          <form className='w-full' onSubmit={handleSubmit(handleCreateGroup)}>
            <div className='w-64 mb-24'>
              <div className='mb-12'>팀 프로필</div>
              <ImgUpload setImgUrl={setImgUrl} />
            </div>
            <div className='mb-40'>
              <div className='mb-12'>팀 이름</div>
              <Controller
                name='name'
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder='팀 이름을 입력해주세요.'
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <Button type='submit' color='primary' size='lg' className='w-full'>
              생성하기
            </Button>
          </form>
          <div>팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.</div>
        </div>
      </div>
    </div>
  );
}
export default CreateGroup;
