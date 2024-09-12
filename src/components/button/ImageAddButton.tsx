import { useState } from 'react';
import { IconPlus } from '@/assets/IconList';

function ImageAddButton() {
  const [image, setImage] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]); // 선택된 이미지를 상태로 저장
    }
  };

  const handleImageClick = () => {
    document.getElementById('imageInput')?.click(); // input 클릭 이벤트 발생
  };

  return (
    <div className='mt-40 min-w-343 h-auto tablet:mt-56 mx-16 tablet:mx-24 desktop:w-1200 desktop:mx-auto relative'>
      {/* 이미지 업로드 박스 */}
      <p className='mb-16 text-md mt-32 tablet:mt-40 tablet:text-lg font-medium text-text-primary'>
        이미지
      </p>
      <div
        role='button'
        tabIndex={0} // 키보드로 포커스를 받을 수 있도록 추가
        onClick={handleImageClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleImageClick(); // Enter 또는 Space 키 입력 시 이미지 클릭 이벤트 실행
          }
        }}
        className='w-160 h-160 tablet:w-240 tablet:h-240 flex flex-col items-center gap-14 justify-center bg-background-secondary rounded-12 border border-border-primary hover:border-interaction-hover focus:border-interaction-focus'
      >
        <IconPlus width={48} height={48} />
        <p className='text-text-default text-lg'>이미지 등록</p>
      </div>

      {/* 파일 선택 input (화면에서 보이지 않음) */}
      <input
        id='imageInput'
        type='file'
        accept='image/*'
        onChange={handleImageUpload}
        style={{ display: 'none' }} // 화면에 보이지 않도록 처리
      />

      {/* 이미지 미리보기 (선택된 파일이 있을 경우) */}
      {image && <p>선택된 이미지: {image.name}</p>}
    </div>
  );
}

export default ImageAddButton;
