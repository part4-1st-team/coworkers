import Button from '@/components/button/button';
import ImgUpload from '@/components/imgUpload/ImgUpload';
import Input from '@/components/input/input';
import { postGroup } from '@/services/GroupAPI';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';

function CreateGroup() {
  const [groupName, setGroupName] = useState<string>(''); // 팀 이름 상태 관리
  const [imgUrl, setImgUrl] = useState<string | null>(null); // 업로드된 이미지 URL 상태 관리
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!groupName) {
      alert('팀 이름을 입력해주세요.');
      return;
    }

    try {
      // 그룹 생성 API 호출
      const response = await postGroup({
        name: groupName,
        image: imgUrl,
      } as PostGroupRequest);

      // 그룹 생성 후 해당 그룹 페이지로 이동
      router.push(`/group/${response.id}`);
    } catch (error) {
      console.error('그룹 생성에 실패했습니다.', error);
      alert('그룹 생성에 실패했습니다.');
    }
  };

  return (
    <section className='mx-16 tablet:mx-142 desktop:mx-430 mt-132 text-lg text-text-primary'>
      <div className='w-full flex flex-col items-center gap-24'>
        <div className='text-4xl'>팀 생성하기</div>
        <form className='w-full' onSubmit={handleSubmit}>
          <div className='w-64 mb-24'>
            <div className='mb-12'>팀 프로필</div>
            <ImgUpload setImgUrl={setImgUrl} />
          </div>
          <div className='mb-40'>
            <div className='mb-12'>팀 이름</div>
            <Input
              placeholder='팀 이름을 입력해주세요.'
              value={groupName} // 상태 값 설정
              onChange={(e) => setGroupName(e.target.value)} // 상태 업데이트
            />
          </div>
          <Button type='submit' color='primary' size='lg' className='w-full'>
            생성하기
          </Button>
        </form>
        <div>팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.</div>
      </div>
    </section>
  );
}
export default CreateGroup;
