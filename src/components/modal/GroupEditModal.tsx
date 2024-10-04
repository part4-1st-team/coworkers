import Button from '@/components/button/button';
import Input from '@/components/input/input';
import useModalStore from '@/stores/ModalStore';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { getGroup, patchGroup } from '@/services/GroupAPI';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useQueryParameter from '@/hooks/useQueryParameter';
import Modal from './Modal';
import useToast from '../toast/useToast';
import ImgUpload from '../imgUpload/ImgUpload';

interface FormState {
  name: string;
}

function GroupEditModal() {
  const { toast } = useToast();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormState>();
  const [group, setGroup] = useState<Group | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [prevImg, setPrevImg] = useState<string | undefined>();
  const queryClient = useQueryClient();
  const { setModalClose } = useModalStore();
  const { groupId } = useQueryParameter();

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
      setModalClose();
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
    <form
      onSubmit={handleSubmit(handleChangeGroup)}
      className='px-36 pt-32 flex flex-col items-center'
    >
      <Modal.Title title='팀 수정하기' />
      <Modal.Description description='팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.' />
      <div className='w-full my-24'>
        <div className='left-0 mb-8 text-text-primary dark:text-text-primary-dark'>
          팀 프로필
        </div>
        <ImgUpload prevImg={prevImg} setImgUrl={setCurrentImage} />
      </div>
      <div className='w-full mb-42'>
        <Controller
          name='name'
          control={control}
          rules={{
            required: '팀 이름을 입력해주세요.',
            maxLength: {
              value: 29,
              message: '팀 이름은 30글자 이상 넘어갈 수 없습니다.',
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

      <Modal.Buttons>
        <Button
          type='button'
          color='white'
          className='w-full'
          onClick={setModalClose}
        >
          닫기
        </Button>
        <Button type='submit' color='primary' className='w-full'>
          수정하기
        </Button>
      </Modal.Buttons>
    </form>
  );
}

export default GroupEditModal;
