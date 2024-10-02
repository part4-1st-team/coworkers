import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { IconHeart } from '@/assets/IconList';
import BoardDropdownMenu from '@/components/board/boardDropdown';
import ReportDropdownMenu from '@/components/board/ReportDropdownMenu';
import { deleteArticle } from '@/services/ArticleAPI';
import useArticleDetail from '@/hooks/useArticleDetail';
import useToast from '@/components/toast/useToast';
import { useMutation } from '@tanstack/react-query';
import useUser from '@/hooks/useUser';
import ProfileImage from '@/components/member/ProfileImage';
import useModalStore from '@/stores/ModalStore';
import DeleteArticleModal from '@/components/modal/DeleteArticleModal';
import useLikeStore from '../../commponent/useLikeStore';

interface ArticleCardProps {
  article: Article;
  onDeleteSuccess: () => void;
}

function ArticleCard({ article, onDeleteSuccess }: ArticleCardProps) {
  const { createdAt, title, image, writer, id } = article;
  const router = useRouter();
  const { articleDetail, error, isFetching } = useArticleDetail(id as number);
  const { user: currentUser, isLoading, error: userError } = useUser();
  const { toast } = useToast();
  const { setModalOpen, setModalClose } = useModalStore();
  const { likedArticles, likeCounts } = useLikeStore();

  const deleteMutation = useMutation({
    mutationFn: () => deleteArticle(id),
    onSuccess: () => {
      toast('Success', '게시글이 성공적으로 삭제되었습니다.');
      onDeleteSuccess();
    },
    onError: () => {
      toast('Error', '게시글 삭제 중 오류가 발생했습니다.');
    },
  });

  const renderContentPreview = (
    text: string | undefined,
    maxLength: number,
  ) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

  const handleEdit = () => {
    router.push({
      pathname: `/board/${id}`,
      query: { isEditing: 'true' },
    });
  };

  const handleDelete = () => {
    setModalOpen(
      <DeleteArticleModal
        onConfirm={() => {
          deleteMutation.mutate();
          setModalClose();
        }}
        onCancel={() => setModalClose()}
      />,
    );
  };

  // 에러 발생 시 '/board'로 리다이렉션
  useEffect(() => {
    if (error || userError) {
      router.push('/board');
    }
  }, [error, userError, router]);
  if (isFetching || isLoading) {
    return (
      <div className='flex items-center text-text-primary dark:text-text-primary-dark font-medium text-md'>
        Loading...
      </div>
    );
  }

  const isOwner = currentUser?.id === writer.id;
  const likeCount = likeCounts[id] || 0;

  return (
    <div className='w-full tablet:h-220 pt-24 pb-16 tablet:pb-24 px-16 tablet:px-32 flex bg-background-secondary dark:bg-background-secondary-dark rounded-12 relative shadow-md'>
      <Link
        href={`/board/${id}`}
        className='w-full flex flex-col justify-between h-full'
      >
        <div className='flex justify-between '>
          <div className='flex flex-col'>
            <p className='w-330 tablet:w-400 h-30 tablet:h-30 text-lg tablet:text-2lg tablet:leading-relaxed text-text-secondary dark:text-text-secondary-dark font-medium text-left'>
              {renderContentPreview(title, 25)}
            </p>
            <p
              className='mt-10 tablet:mt-20 w-330 tablet:w-auto text-md text-text-secondary dark:text-text-secondary-dark text-left'
              style={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 4, // 최대 줄 표시
                overflow: 'hidden', // 넘치는 텍스트는 숨기기
                whiteSpace: 'pre-wrap', // 줄바꿈 처리
              }}
            >
              {renderContentPreview(articleDetail?.content, 50)}
            </p>
          </div>

          {image && (
            <div className='w-72 h-72 absolute top-60 right-15 tablet:top-30 tablet:right-60 '>
              <Image src={image} alt='샘플이미지' width={72} height={72} />
            </div>
          )}
        </div>

        <div className='mt-16 flex justify-between gap-12'>
          <div className='flex items-center gap-12'>
            <ProfileImage userImage={writer.image} size={32} />
            <p className='text-text-primary dark:text-text-primary-dark text-md font-medium'>
              {writer.nickname}
            </p>
            <div className='h-12 border border-background-tertiary dark:border-background-tertiary-dark' />
            <p className='text-md text-text-disabled dark:text-text-disabled-dark flex items-center'>
              {new Date(createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </Link>
      <div className='flex flex-col justify-between'>
        <div className='hidden tablet:flex justify-end'>
          {isOwner ? (
            <BoardDropdownMenu onEdit={handleEdit} onDelete={handleDelete} />
          ) : (
            <ReportDropdownMenu />
          )}
        </div>

        <div className='flex items-center justify-center gap-8'>
          <IconHeart
            color={likedArticles[id as number] ? 'gray' : 'gray'}
            fill={likedArticles[id as number] ? 'gray' : 'none'}
            style={{ cursor: 'pointer' }}
          />
          <p className='text-md text-text-disabled dark:text-text-disabled-dark flex items-center'>
            {likeCount >= 999 ? '999+' : likeCount}
          </p>
          <div className='flex items-center tablet:hidden'>
            {isOwner ? (
              <BoardDropdownMenu onEdit={handleEdit} onDelete={handleDelete} />
            ) : (
              <ReportDropdownMenu />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
