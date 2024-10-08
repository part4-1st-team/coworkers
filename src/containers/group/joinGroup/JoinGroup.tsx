import { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '@/components/button/button';
import Input from '@/components/input/input';
import { postGroupInvitation } from '@/services/GroupAPI';
import { getUser } from '@/services/userAPI';
import useToast from '@/components/toast/useToast';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface FormState {
  token: string;
}

function JoinGroup() {
  const { toast } = useToast();
  const { control, handleSubmit } = useForm<FormState>();
  const [userEmail, setUserEmail] = useState<string>('');
  const router = useRouter();
  const queryClient = useQueryClient();

  const fetchUserEmail = async () => {
    try {
      const user = await getUser();
      setUserEmail(user.email);
    } catch (error) {
      toast('Error', '유저 정보를 가져오는 데 실패했습니다.');
    }
  };

  useEffect(() => {
    fetchUserEmail();
  }, []);

  // 초대 수락 mutation
  const mutation = useMutation({
    mutationFn: async (data: { userEmail: string; token: string }) => {
      return postGroupInvitation(data); // 초대 수락 API 호출
    },
    onSuccess: (response) => {
      toast('Success', '그룹 참여에 성공했습니다.');
      queryClient.invalidateQueries({
        queryKey: ['groups'],
      });
      router.push(`/group/${response.groupId}`);
    },
    onError: () => {
      toast('Error', '그룹 참여에 실패했습니다.');
    },
  });

  const onSubmitJoinGroup: SubmitHandler<FormState> = ({ token }) => {
    mutation.mutate({ userEmail, token });
  };

  return (
    <div className='main-container '>
      <section className='mx-16 tablet:mx-142 desktop:mx-340 mt-132 text-lg text-text-primary dark:text-text-primary-dark'>
        <div className='w-full flex flex-col items-center gap-24'>
          <div className='text-4xl'>팀 참여하기</div>
          <form className='w-full' onSubmit={handleSubmit(onSubmitJoinGroup)}>
            <div className='mb-40'>
              <div className='mb-12'>팀 링크</div>
              <Controller
                name='token'
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder='팀 링크를 입력해주세요.'
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <Button type='submit' color='primary' size='lg' className='w-full'>
              참여하기
            </Button>
          </form>
          <div>공유받은 팀 링크를 입력해 참여할 수 있어요.</div>
        </div>
        <div className='flex items-center mt-24 '>
          <div className='flex-grow border-t border-border-primary dark:border-border-primary-dark' />
          <div className='border-border-primary dark:border-border-primary-dark mx-24 text-text-primary dark:text-text-primary-dark'>
            OR
          </div>
          <div className='flex-grow border-t border-border-primary dark:border-border-primary-dark' />
        </div>
        <span className='flex justify-center gap-12 text-text-primary dark:text-text-primary-dark font-500 w-full mt-24 mb-16'>
          <p>새로운 팀을 구성하고 싶으신가요?</p>
          <Link
            href='/group/create-group'
            className='text-interaction-focus underline decoration-interaction-focus'
          >
            팀 생성하기
          </Link>
        </span>
      </section>
    </div>
  );
}

export default JoinGroup;
