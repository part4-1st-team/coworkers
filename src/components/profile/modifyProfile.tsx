import Image from 'next/image';
import { ChangeEvent, useState } from 'react';

function ModifyProfile() {
  const [imgUrl, setImgUrl] = useState<string | null>(null); // 예시를 위한 상태값

  // 이미지 변경 핸들러
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setImgUrl(url);
    }
  };

  return (
    <label htmlFor='file-input' className='cursor-pointer'>
      {/* 숨겨진 파일 선택 input */}
      <input
        type='file'
        id='file-input'
        className='hidden'
        accept='image'
        onChange={handleImageChange}
      />

      {/* 조건부 렌더링으로 이미지 미리보기 */}
      {imgUrl && (
        <Image
          src='/svgs/ic_modifyProfile.svg'
          alt='프로필 수정 버튼'
          width={64}
          height={64}
        />
      )}
    </label>
  );
}

export default ModifyProfile;
