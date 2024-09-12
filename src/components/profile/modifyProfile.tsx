import axios from 'axios';
import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';

function ModifyProfile() {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(null); // 예시를 위한 상태값

  // 이미지 변경 핸들러
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setImgUrl(url);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // api로 유저 정보 가져오기
        const response = await axios.get('/user');
        const user = response.data;
        // 유저 이미지 정보 상태 설정
        setUserImage(user.Image);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <label htmlFor='file-input' className='cursor-pointer bg-modifyProfile'>
      {/* 숨겨진 파일 선택 input */}
      <input
        type='file'
        id='file-input'
        className='hidden'
        accept='image'
        onChange={handleImageChange}
      />
      <Image
        // 선택 이미지, 유저 설정 이미지, 기본 이미지 순서로 조건부 렌더링
        src={imgUrl || userImage || '/svgs/ic_modifyProfile.svg'}
        alt='프로필 수정 버튼'
        width={64}
        height={64}
      />
    </label>
  );
}

export default ModifyProfile;
