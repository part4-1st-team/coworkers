import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import BaseButton from '@/components/button/baseButton';
import Input from '@/components/input/input';
import BoxInput from '@/components/input/boxInput';
import { postArticle } from '@/services/ArticleAPI';
import postImageUpload from '@/services/ImageAPI';
import ImageAddButton from '@/components/button/ImageAddButton';

function AddPostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState<string>('');

  // 이미지 업로드 mutation
  const { mutate: uploadImageMutate } = useMutation({
    mutationFn: postImageUpload,
    onSuccess: (data) => {
      setImageUrl(data.url); // 성공적으로 업로드된 이미지 URL 설정
    },
    onError: (error) => {
      // alert('이미지 업로드 중 오류가 발생했습니다.');
      /* TODO: 모달 교체 */
    },
  });

  // 게시글 등록 mutation
  const { mutate: postArticleMutate, status: postArticleStatus } = useMutation({
    mutationFn: postArticle,
    onSuccess: () => {
      // 성공 시 폼 초기화
      setTitle('');
      setContent('');
      setImageUrl('');
      // alert('게시글이 성공적으로 등록되었습니다.');
    },
    onError: (error) => {
      // alert('게시글 등록 중 오류가 발생했습니다.');
      /* TODO: 모달 교체 */
    },
  });

  // 제목 입력 핸들러
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // 내용 입력 핸들러
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  // 이미지 변경 핸들러
  const handleImageChange = (file: File | null) => {
    if (file) {
      uploadImageMutate(file); // 이미지 업로드 mutation 실행
    } else {
      setImageUrl('');
    }
  };

  // 게시글 등록 핸들러
  const handleSubmit = () => {
    if (!title || !content) {
      // alert('제목과 내용을 입력해 주세요.');
      /* TODO : 프로필 컴포넌트로 변경하기 */
      return;
    }

    postArticleMutate({
      title,
      content,
      image: imageUrl || undefined,
    });
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
            disabled={postArticleStatus === 'pending'} // 로딩 중일 때 버튼 비활성화
          >
            {postArticleStatus === 'pending' ? '등록 중...' : '등록'}
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
        <ImageAddButton onImageChange={handleImageChange} imageUrl={imageUrl} />
        <div className='block tablet:hidden mt-32'>
          <BaseButton
            type='button'
            color='primary'
            className='w-full h-48'
            onClick={handleSubmit}
            disabled={postArticleStatus === 'pending'}
          >
            {postArticleStatus === 'pending' ? '등록 중...' : '등록'}
          </BaseButton>
        </div>
      </div>
    </div>
  );
}

export default AddPostPage;
