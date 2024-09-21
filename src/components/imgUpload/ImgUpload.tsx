import { IconImg } from '@/assets/IconList';
import EditButton from '@/components/button/editButton';
import postImageUpload from '@/services/ImageAPI';

import { useState, ChangeEvent, useRef } from 'react';

interface ImgUploadProps {
  setImgUrl: (url: string) => void; // 이미지 URL을 부모 컴포넌트로 전달
}

function ImgUpload({ setImgUrl }: ImgUploadProps) {
  const [localImgUrl, setLocalImgUrl] = useState<string>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleEditButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // 숨겨진 파일 input을 클릭하여 파일 탐색창을 엶
    }
  };

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const prevImgUrl = URL.createObjectURL(file);
      setLocalImgUrl(prevImgUrl);

      try {
        const uploadedImage: ImageURL = await postImageUpload(file);
        setLocalImgUrl(uploadedImage.url); // 로컬 이미지 URL 상태 업데이트
        setImgUrl(uploadedImage.url); // 부모 컴포넌트로 URL 전달
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
        setLocalImgUrl(undefined);
      }
    }
  };

  return (
    <div className='relative w-64 h-64 rounded-full bg-background-secondary border-2 border-border-primary flex justify-center items-center'>
      {localImgUrl ? (
        <img
          src={localImgUrl}
          alt='업로드된 이미지'
          className='w-full h-full object-cover rounded-full'
        />
      ) : (
        <IconImg />
      )}
      <div className='w-18 h-18 absolute bottom-0 right-0 flex items-center justify-center rounded-full border-2 border-background-primary bg-background-tertiary'>
        <button type='button' onClick={handleEditButtonClick}>
          <EditButton size='sm' />
        </button>
        <input
          ref={fileInputRef} // file input을 참조
          type='file'
          accept='.jpg,.png' // 파일 확장자 제한
          className='hidden'
          onChange={handleImageChange}
        />
      </div>
    </div>
  );
}

export default ImgUpload;
