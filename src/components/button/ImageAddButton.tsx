import { useState, useEffect } from 'react';
import { IconPlus } from '@/assets/IconList';
import Image from 'next/image';
import clsx from 'clsx';

interface ImageAddButtonProps {
  onImageChange: (file: File | null) => void;
  imageUrl?: string;
}

function ImageAddButton({ onImageChange, imageUrl }: ImageAddButtonProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (imageUrl) {
      setImagePreview(imageUrl);
    } else {
      setImagePreview(null); // 빈 문자열일 때 초기화
    }
  }, [imageUrl]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onImageChange(file);
    }
  };

  const handleImageClick = () => {
    document.getElementById('imageInput')?.click();
  };

  const baseStyles =
    'relative w-160 h-160 tablet:w-240 tablet:h-240 flex flex-col items-center justify-center rounded-12 overflow-hidden';
  const imageStyles = imagePreview
    ? 'bg-none border-none hover:border-none focus:border-none'
    : 'bg-background-secondary border border-border-primary hover:border-interaction-hover focus:border-interaction-focus';

  return (
    <>
      <div
        role='button'
        tabIndex={0}
        onClick={handleImageClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleImageClick();
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
