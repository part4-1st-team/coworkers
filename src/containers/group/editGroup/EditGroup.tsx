import { useState, useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';
import Input from '@/components/input/input';
import Button from '@/components/button/button';
import useToast from '@/components/toast/useToast';
import { getGroup, patchGroup } from '@/services/GroupAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ImgUpload from '@/components/imgUpload/ImgUpload';

interface FormState {
  name: string;
}

function EditGroup() {
  const { toast } = useToast();
  const { control, handleSubmit, reset } = useForm<FormState>();
  const [group, setGroup] = useState<Group | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [prevImg, setPrevImg] = useState<string | undefined>();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { groupId } = router.query;

  // 그룹 정보 가져오는 함수
  const groupSetting = async () => {
    if (groupId) {
      const currentGroup = await getGroup(Number(groupId));
      setGroup(currentGroup);
      setPrevImg(currentGroup.image);
      reset({ name: currentGroup.name });
    }
  };

  const updateGroupMutation = useMutation({
    mutationFn: async (name: string) => {
      const data: PatchGroup = {};

      if (currentImage !== null) {
        data.image = currentImage;
      }

      if (group?.name !== name) {
        data.name = name;
      }

      return patchGroup(Number(groupId), data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['group'],
      });
      toast('Success', '팀 설정이 업데이트되었습니다.');
      router.push(`/group/${groupId}`);
    },
    onError: () => {
      toast('Error', '팀 설정 업데이트에 실패했습니다.');
    },
  });

  const handleChangeGroup: SubmitHandler<FormState> = (data) => {
    const { name } = data;

    updateGroupMutation.mutateAsync(name);
  };

  useEffect(() => {
    groupSetting();
  }, [groupId]);

  return (
    <div className='mx-16 tablet:mx-142 desktop:mx-430 mt-132 text-lg text-text-primary'>
      <div className='w-full flex flex-col items-center gap-24'>
        <div className='text-4xl'>팀 수정하기</div>
        <form className='w-full' onSubmit={handleSubmit(handleChangeGroup)}>
          <div className='w-64 mb-24'>
            <div className='mb-12'>팀 프로필</div>
            <ImgUpload prevImg={prevImg} setImgUrl={setCurrentImage} />
          </div>
          <div className='mb-40'>
            <div className='mb-12'>팀 이름</div>
            <Controller
              name='name'
              control={control}
              render={({ field }) => (
                <Input
                  placeholder='팀 이름을 입력해주세요.'
                  value={field.value || ''}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          <Button type='submit' color='primary' size='lg' className='w-full'>
            수정하기
          </Button>
        </form>
        <section className='w-full text-center font-normal'>
          팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
        </section>
      </div>
    </div>
  );
}

export default EditGroup;
