import { useState, useEffect, ChangeEvent, useRef } from 'react';
import { IconImg } from '@/assets/IconList';
import EditButton from '@/components/button/editButton';
import postImageUpload from '@/services/ImageAPI';
import useToast from '@/components/toast/useToast';

interface ImgUploadProps {
  prevImg?: string;
  setImgUrl: (url: string) => void;
}

function ImgUpload({ prevImg, setImgUrl }: ImgUploadProps) {
  const [localImgUrl, setLocalImgUrl] = useState<string | undefined>(prevImg);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (prevImg) {
      setLocalImgUrl(prevImg);
    }
  }, [prevImg]);

  const handleEditButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const tempUrl = URL.createObjectURL(file); // 미리보기
      setLocalImgUrl(tempUrl);
      setIsUploading(true);

      try {
        const uploadedImage: ImageURL = await postImageUpload(file); // 파일 업로드
        setImgUrl(uploadedImage.url); // 업로드된 이미지 URL을 부모 컴포넌트에 전달
        setLocalImgUrl(uploadedImage.url); // 업로드 성공 시 로컬 이미지 URL도 업데이트
        toast('Success', '이미지가 성공적으로 업로드되었습니다.');
      } catch (error) {
        toast('Error', '이미지 업로드에 실패했습니다. 다시 시도해주세요.');
        setLocalImgUrl(prevImg); // 업로드 실패 시 이전 이미지를 유지
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div
      className='relative w-64 h-64 rounded-full bg-background-secondary dark:bg-background-secondary-dark border-2 
    border-border-primary dark:border-border-primary-dark flex justify-center items-center'
    >
      {localImgUrl ? (
        <img
          src={localImgUrl}
          alt='업로드된 이미지'
          className='w-full h-full object-cover rounded-full'
        />
      ) : (
        <IconImg />
      )}
      <div className='absolute bottom-0 right-0 flex items-center justify-center rounded-full'>
        <EditButton
          size='sm'
          className='flex justify-center items-center'
          onClick={handleEditButtonClick}
        />
        <input
          ref={fileInputRef}
          type='file'
          accept='.jpg,.png'
          className='hidden'
          onChange={handleImageChange}
        />
      </div>
    </div>
  );
}

export default ImgUpload;
