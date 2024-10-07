import Button from '@/components/button/button';
import ImgUpload from '@/components/imgUpload/ImgUpload';
import Input from '@/components/input/input';
import useToast from '@/components/toast/useToast';
import { postGroup } from '@/services/GroupAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

interface FormState {
  name: string;
}

function CreateGroup() {
  const { toast } = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormState>();
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
        return;
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
      <div className='mx-16 tablet:mx-142 desktop:mx-340 mt-132 text-lg text-text-primary dark:text-text-primary-dark'>
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
                rules={{
                  required: '팀 이름을 입력해주세요.',
                  maxLength: {
                    value: 29,
                    message: '팀 이름은 30글자 미만으로 입력해주세요.',
                  },
                }}
                render={({ field }) => (
                  <>
                    <Input
                      placeholder='팀 이름을 입력해주세요.'
                      value={field.value}
                      onChange={field.onChange}
                      error={!!errors.name}
                    />
                    {errors.name && (
                      <div className='fixed text-status-danger text-sm mt-6 ml-6'>
                        {errors.name.message}
                      </div>
                    )}
                  </>
                )}
              />
            </div>
            <Button type='submit' color='primary' size='lg' className='w-full'>
              생성하기
            </Button>
          </form>
          <div>팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.</div>
        </div>
        <div className='flex items-center mt-24 '>
          <div className='flex-grow border-t border-border-primary dark:border-border-primary-dark' />
          <div className='border-border-primary dark:border-border-primary-dark mx-24 text-text-primary dark:text-text-primary-dark'>
            OR
          </div>
          <div className='flex-grow border-t border-border-primary dark:border-border-primary-dark' />
        </div>
        <span className='flex justify-center gap-12 text-text-primary dark:text-text-primary-dark font-500 w-full mt-24 mb-16'>
          <p>초대 링크가 있으신가요?</p>
          <Link
            href='/group/join-group'
            className='text-interaction-focus underline decoration-interaction-focus'
          >
            팀 참여하기
          </Link>
        </span>
      </div>
    </div>
  );
}
export default CreateGroup;
