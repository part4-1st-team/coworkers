import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import ImagePreview from '@/components/button/ImagePreview';

interface ImageAddButtonProps {
  onImageChange: (file: File | null) => void;
  imageUrl?: string;
}

function ImageAddButton({ onImageChange, imageUrl }: ImageAddButtonProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(
    imageUrl || null,
  );
  const inputFileRef = useRef<HTMLInputElement>(null);

  // 이미지 URL이 변경될 때마다 imagePreview 업데이트
  useEffect(() => {
    setImagePreview(imageUrl || null);
  }, [imageUrl]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageChange(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      onImageChange(null);
      setImagePreview(imageUrl || null);
    }
  };

  const handleImageClick = () => {
    inputFileRef.current?.click();
  };

  const baseStyles =
    'relative w-160 h-160 tablet:w-240 tablet:h-240 flex flex-col items-center justify-center rounded-12 overflow-hidden';
  const imageStyles = imagePreview
    ? 'bg-none border-none'
    : 'bg-background-secondary dark:bg-background-secondary-dark border border-border-primary dark:border-border-primary-dark hover:border-interaction-hover focus:border-interaction-focus';

  return (
    <>
      <button
        type='button'
        onClick={handleImageClick}
        className={clsx(baseStyles, imageStyles)}
        aria-label='이미지 업로드'
      >
        <ImagePreview imagePreview={imagePreview} />
      </button>

      <input
        ref={inputFileRef}
        id='imageInput'
        type='file'
        accept='image/*'
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />
    </>
  );
}

export default ImageAddButton;
