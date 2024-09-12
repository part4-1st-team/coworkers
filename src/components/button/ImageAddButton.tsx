import { useState } from 'react';
import { IconPlus } from '@/assets/IconList';
import Image from 'next/image';
import clsx from 'clsx';

interface ImageAddButtonProps {
  onImageChange: (file: File | null) => void;
}

function ImageAddButton({ onImageChange }: ImageAddButtonProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onImageChange(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleImageClick = () => {
    document.getElementById('imageInput')?.click(); // input 클릭 이벤트 발생
  };

  // 스타일 클래스 정의
  const baseStyles =
    'relative w-160 h-160 tablet:w-240 tablet:h-240 flex flex-col items-center justify-center rounded-12 overflow-hidden';
  const imageStyles = imagePreview
    ? 'bg-none border-none hover:border-none focus:border-none'
    : 'bg-background-secondary border border-border-primary hover:border-interaction-hover focus:border-interaction-focus';

  return (
    <>
      <div
        role='button'
        tabIndex={0} // 키보드로 포커스를 받을 수 있도록 추가
        onClick={handleImageClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleImageClick(); // Enter 또는 Space 키 입력 시 이미지 클릭 이벤트 실행
          }
        }}
        className={clsx(baseStyles, imageStyles)}
      >
        {imagePreview ? (
          <Image
            src={imagePreview}
            alt='미리보기'
            layout='fill'
            objectFit='cover'
            className='rounded-12'
          />
        ) : (
          <>
            <IconPlus width={48} height={48} />
            <p className='text-text-default text-lg'>이미지 등록</p>
          </>
        )}
      </div>

      {/* 파일 선택 input (화면에서 보이지 않음) */}
      <input
        id='imageInput'
        type='file'
        accept='image/*'
        onChange={handleImageUpload}
        style={{ display: 'none' }} // 화면에 보이지 않도록 처리
      />
    </>
  );
}

export default ImageAddButton;
