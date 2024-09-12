import { useState } from 'react';
import BaseButton from '@/components/button/baseButton';
import Input from '@/components/input/input';
import BoxInput from '@/components/input/boxInput';
import { postArticle } from '@/services/ArticleAPI';
import postImageUpload from '@/services/ImageAPI'; // postImageUpload 함수 가져오기
import ImageAddButton from '@/components/button/ImageAddButton';

function AddPostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState<string>('');

  // 제목 입력 핸들러
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // 내용 입력 핸들러
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  // 이미지 변경 핸들러
  const handleImageChange = async (file: File | null) => {
    if (file) {
      try {
        const result = await postImageUpload(file); // file을 직접 넘김
        setImageUrl(result.url);
      } catch (error) {
        console.error('이미지 업로드 중 오류가 발생했습니다:', error);
        alert('이미지 업로드 중 오류가 발생했습니다.');
      }
    } else {
      setImageUrl('');
    }
  };

  const handleSubmit = async () => {
    if (!title || !content) {
      /* TODO : 토스트 적용 */
      return;
    }

    try {
      await postArticle({
        title,
        content,
        image: imageUrl || '', // 이미지 URL이 없으면 빈 문자열로 전송
      });

      // 성공 후 상태 초기화
      setTitle('');
      setContent('');
      setImageUrl('');
    } catch (error) {
      console.error('게시글 등록 중 오류가 발생했습니다:', error);
      alert('게시글 등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className='mt-40 min-w-343 h-auto tablet:mt-56 mx-16 tablet:mx-24 desktop:w-1200 desktop:mx-auto relative'>
      <div className='flex items-center justify-between'>
        <p className='text-lg font-medium tablet:text-xl tablet:font-bold text-text-primary'>
          게시글 쓰기
        </p>
        <div className='hidden tablet:block'>
          <BaseButton
            type='button'
            color='primary'
            className='w-183 h-48'
            onClick={handleSubmit}
          >
            등록
          </BaseButton>
        </div>
      </div>

      <div className='mt-32 w-full border-t border-border-primary' />

      <div className='flex flex-col mt-24 tablet:mt-40'>
        <div className='flex gap-6 mb-16'>
          <p className='text-brand-tertiary'>*</p>
          <p className='text-md tablet:text-lg font-medium text-text-primary'>
            제목
          </p>
        </div>
        <Input
          placeholder='제목을 입력해 주세요.'
          className='h-48'
          value={title}
          onChange={handleTitleChange}
        />
        <div className='flex gap-6 mb-16 mt-32 tablet:mt-40'>
          <p className='text-brand-tertiary'>*</p>
          <p className='text-md tablet:text-lg font-medium text-text-primary'>
            내용
          </p>
        </div>
        <BoxInput
          placeholder='내용을 입력해 주세요.'
          className='h-240'
          value={content}
          onChange={handleContentChange}
        />

        <p className='mb-16 text-md mt-32 tablet:mt-40 tablet:text-lg font-medium text-text-primary'>
          이미지
        </p>
        <ImageAddButton onImageChange={handleImageChange} />
        <div className='block tablet:hidden mt-32'>
          <BaseButton
            type='button'
            color='primary'
            className='w-full h-48'
            onClick={handleSubmit}
          >
            등록
          </BaseButton>
        </div>
      </div>
    </div>
  );
}

export default AddPostPage;
