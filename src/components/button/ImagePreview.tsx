import { IconPlus } from '@/assets/IconList';
import Image from 'next/image';

interface ImagePreviewProps {
  imagePreview: string | null;
}

function ImagePreview({ imagePreview }: ImagePreviewProps) {
  return imagePreview ? (
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
      <p className='text-text-default dark:text-text-default-dark text-lg'>
        이미지 등록
      </p>
    </>
  );
}

export default ImagePreview;
