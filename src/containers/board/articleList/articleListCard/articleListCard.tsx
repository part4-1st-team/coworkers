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
import ProfileImage from '@/components/member/ProfileImage';
import useModalStore from '@/stores/ModalStore';
import DeleteArticleModal from '@/components/modal/DeleteArticleModal';
import useUserStore from '@/stores/userStore';
import SkeletonArticleCard from '@/containers/board/articleList/articleListCard/skeletonArticleCard';

interface ArticleCardProps {
  article: Article;
  onDeleteSuccess: () => void;
}

function ArticleCard({ article, onDeleteSuccess }: ArticleCardProps) {
  const { createdAt, title, image, writer, id, likeCount } = article;
  const router = useRouter();
  const { articleDetail, error, isFetching } = useArticleDetail(id as number);
  const { user: currentUser } = useUserStore();
  const { toast } = useToast();
  const { setModalOpen, setModalClose } = useModalStore();

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
    if (error) {
      router.push('/auth/signin');
    }
  }, [error, router]);

  if (isFetching) {
    return <SkeletonArticleCard />;
  }

  const isOwner = currentUser?.id === writer.id;

  return (
    <div className='w-full tablet:h-220 pt-24 pb-16 tablet:pb-24 px-16 tablet:px-32 flex bg-background-secondary dark:bg-background-secondary-dark rounded-12 relative shadow-md'>
      <Link
        href={`/board/${id}`}
        className='w-full flex flex-col justify-between h-full'
      >
        <div className='flex justify-between '>
          <div className='flex flex-col'>
            <p className='w-180 tablet:w-400 h-30 tablet:h-30 text-md tablet:text-2lg tablet:leading-relaxed text-text-secondary dark:text-text-secondary-dark font-medium text-left'>
              {renderContentPreview(title, 20)}
            </p>
            <p
              className='mt-10 tablet:mt-20 w-210 tablet:w-auto desktop:w-420 text-md text-text-secondary dark:text-text-secondary-dark text-left'
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
            <div className='w-64 h-64 tablet:w-72 tablet:h-72 absolute top-24 right-24 tablet:top-60 tablet:right-35 '>
              <Image src={image} alt='샘플이미지' width={72} height={72} />
            </div>
          )}
        </div>

        <div className='mt-16 flex justify-between gap-12'>
          <div className='flex items-center gap-12'>
            <ProfileImage userImage={writer.image} size={32} />
            <p className='text-text-primary dark:text-text-primary-dark text-xs tablet:text-md font-medium'>
              {writer.nickname}
            </p>
            <div className='h-12 border border-background-tertiary dark:border-background-tertiary-dark' />
            <p className='text-md text-text-disabled dark:text-text-disabled-dark flex items-center'>
              {new Date(createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </Link>
      <div className='flex flex-col tablet:justify-start justify-end mb-3 '>
        <div className='flex items-center justify-center gap-8'>
          <IconHeart
            color={articleDetail?.isLiked ? 'gray' : 'gray'}
            fill={articleDetail?.isLiked ? 'gray' : 'none'}
          />
          <p className='text-md text-text-disabled dark:text-text-disabled-dark flex items-center'>
            {likeCount >= 999 ? '999+' : likeCount}
          </p>
          <div className=''>
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
