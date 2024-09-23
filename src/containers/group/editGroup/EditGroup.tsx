import { useState, useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';
import Input from '@/components/input/input';
import Button from '@/components/button/button';
import useToast from '@/components/toast/useToast';
import { getGroup, patchGroup } from '@/services/GroupAPI';
import useImageMutation from '@/hooks/useImageMutation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ModifyProfile from '@/components/member/modifyProfile';

interface FormState {
  name: string;
}

function EditGroup() {
  const { toast } = useToast();
  const { control, handleSubmit } = useForm<FormState>();
  const [group, setGroup] = useState<Group | null>(null); // 그룹 정보를 담을 상태
  const [currentImage, setCurrentImage] = useState<Blob | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { groupId } = router.query;

  const imageMutation = useImageMutation();

  const groupSetting = async () => {
    const currentGroup = getGroup(Number(groupId));
    setGroup(await currentGroup);
  };

  const updateGroupMutation = useMutation({
    mutationFn: async (name: string) => {
      const data: PatchGroup = {};

      if (currentImage !== null) {
        const formData = new FormData();
        formData.append('image', currentImage);
        const uploadedImage = await imageMutation.mutateAsync(currentImage);
        data.image = uploadedImage.url;
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
    if (group) {
      setPreview(group?.image);
    }
  }, [groupId]);

  return (
    <div className='mt-60 w-full h-full bg-background-primary text-text-primary text-lg px-16 pt-56 font-medium'>
      <section className='w-full flex flex-col gap-24 tablet:w-460 mx-auto'>
        <div className='w-full text-center text-24'>팀 수정하기</div>
        <form onSubmit={handleSubmit(handleChangeGroup)}>
          <section>
            <div className='mb-12'>팀 프로필</div>
            <ModifyProfile
              preview={preview}
              setImage={setCurrentImage}
              setPreview={setPreview}
              group
            />
          </section>
          <section>
            <div className='mb-12'>팀 이름</div>
            <Controller
              name='name'
              control={control}
              render={({ field }) => (
                <Input
                  placeholder={group?.name}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </section>
          <Button type='submit' color='primary' className='py-14 mt-40'>
            수정하기
          </Button>
        </form>
        <section className='w-full text-center font-normal'>
          팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
        </section>
      </section>
    </div>
  );
}

export default EditGroup;
