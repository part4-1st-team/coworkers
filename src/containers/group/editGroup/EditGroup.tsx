import { useState, useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';
import Input from '@/components/input/input';
import Button from '@/components/button/button';
import { getGroup, patchGroup } from '@/services/GroupAPI';

interface FormState {
  name: string;
}

function EditGroup() {
  const { control, handleSubmit, setValue } = useForm<FormState>();
  const [group, setGroup] = useState<Group | null>(null); // 그룹 정보를 담을 상태
  const [currentImageBlob, setCurrentImageBlob] = useState<Blob | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();
  const { groupId } = router.query;

  const fetchGroup = async () => {
    try {
      const groupData = await getGroup(Number(groupId));
      setGroup(groupData);
      setValue('name', groupData.name);
      setPreview(groupData.image);
    } catch (error) {
      //TODO 토스트로 처리하기
      console.error('그룹 정보를 불러오는 데 실패했습니다.', error);
    }
  };

  useEffect(() => {
    if (groupId) {
      fetchGroup();
    }
  }, [groupId, setValue]);

  const onSubmit: SubmitHandler<FormState> = async (data) => {
    if (!groupId) return;

    try {
      let imgUrl = group?.image;

      // TODO 적용되도록 수정
      // if (currentImageBlob) {
      //   const formData = new FormData();
      //   formData.append('image', currentImageBlob);

      //   const imageResponse = await uploadImage(formData); // 이미지 업로드 API 호출
      //   imgUrl = imageResponse.url;
      // }

      await patchGroup(Number(groupId), {
        name: data.name,
        image: imgUrl,
      });

      router.push(`/group/${groupId}`);
    } catch (error) {
      // TODO 토스트로 처리하기
      console.error('그룹 수정에 실패했습니다.', error);
    }
  };

  if (!group) {
    // TODO 토스트로 처리
    return <div>정보 없음 오류</div>;
  }

  return (
    <div className='mt-60 w-full h-full bg-background-primary text-text-primary text-lg px-16 pt-56 font-medium'>
      <section className='w-full flex flex-col gap-24 tablet:w-460 mx-auto'>
        <div className='w-full text-center text-24'>팀 수정하기</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section>
            <div className='mb-12'>팀 프로필</div>
            {/* <ModifyProfile
              preview={preview}
              setImage={setCurrentImageBlob}
              setPreview={setPreview}
              group
            /> */}
          </section>
          <section>
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
