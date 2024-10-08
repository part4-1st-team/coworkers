import { useState } from 'react';
import BaseButton from '@/components/button/baseButton';
import Input from '@/components/input/input';
import BoxInput from '@/components/input/boxInput';
import { postArticle } from '@/services/ArticleAPI';
import useImageMutation from '@/hooks/useImageMutation';
import ImageAddButton from '@/components/button/ImageAddButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import useToast from '@/components/toast/useToast';

function AddPostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const router = useRouter(); // useRouter 초기화

  // 이미지 업로드 mutation
  const { mutate: uploadImageMutate, status: uploadStatus } =
    useImageMutation();

  // 게시글 등록 mutation
  const { mutate: postArticleMutate, status: postArticleStatus } = useMutation({
    mutationFn: postArticle,
    onSuccess: () => {
      // 성공 시 폼 초기화
      setTitle('');
      setContent('');
      setImageUrl('');
      toast('Success', '게시글이 성공적으로 등록되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      // 게시글 등록 성공 후 게시판 페이지로 이동
      router.push('/board');
    },
    onError: () => {
      toast('Error', '게시글이 등록이 실패되었습니다.');
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
      uploadImageMutate(file, {
        onSuccess: (data) => {
          setImageUrl(data.url);
        },
        onError: () => {},
      });
    } else {
      setImageUrl('');
    }
  };

  // 게시글 등록 핸들러
  const handleSubmit = () => {
    if (!title || !content) {
      toast('Error', '제목과 내용을 입력해 주세요.');
      return;
    }

    postArticleMutate({
      title,
      content,
      image: imageUrl || undefined,
    });
  };

  return (
    <main className='main-container relative min-w-375'>
      <div className='flex items-center justify-between'>
        <p className='text-lg font-medium tablet:text-xl tablet:font-bold text-text-primary dark:text-text-primary-dark'>
          게시글 쓰기
        </p>
        <div className='hidden tablet:block'>
          <BaseButton
            type='button'
            color='primary'
            className='w-183 h-48'
            onClick={handleSubmit}
            disabled={
              postArticleStatus === 'pending' || uploadStatus === 'pending'
            }
            text={
              postArticleStatus === 'pending' || uploadStatus === 'pending'
                ? '등록 중...'
                : '등록'
            }
          />
        </div>
      </div>

      <div className='mt-32 w-full border-t border-border-primary dark:border-border-primary-dark' />

      <div className='flex flex-col mt-24 tablet:mt-40'>
        <div className='flex gap-6 mb-16'>
          <p className='text-brand-tertiary'>*</p>
          <p className='text-md tablet:text-lg font-medium text-text-primary dark:text-text-primary-dark'>
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
          <p className='text-md tablet:text-lg font-medium text-text-primary dark:text-text-primary-dark'>
            내용
          </p>
        </div>
        <BoxInput
          placeholder='내용을 입력해 주세요.'
          className='h-240'
          value={content}
          onChange={handleContentChange}
        />

        <p className='mb-16 text-md mt-32 tablet:mt-40 tablet:text-lg font-medium text-text-primary dark:text-text-primary-dark'>
          이미지
        </p>
        <ImageAddButton onImageChange={handleImageChange} imageUrl={imageUrl} />
        <div className='block tablet:hidden mt-32'>
          <BaseButton
            type='button'
            color='primary'
            className='w-184 h-48'
            onClick={handleSubmit}
            disabled={
              postArticleStatus === 'pending' || uploadStatus === 'pending'
            }
            text={
              postArticleStatus === 'pending' || uploadStatus === 'pending'
                ? '등록 중...'
                : '등록'
            }
          />
        </div>
      </div>
    </main>
  );
}

export default AddPostPage;
