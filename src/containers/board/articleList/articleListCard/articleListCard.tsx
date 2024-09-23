import Image from 'next/image';
import { useRouter } from 'next/router';
import { IconHeart } from '@/assets/IconList';
import BoardDropdownMenu from '@/components/board/boardDropdown';
import { deleteArticle } from '@/services/ArticleAPI';
import useArticleDetail from '@/hooks/useArticleDetail';
import useToast from '@/components/toast/useToast';
import { useMutation } from '@tanstack/react-query';
import useUser from '@/hooks/useUser';
import ProfileImage from '@/components/member/ProfileImage';

interface ArticleCardProps {
  board: Article;
  onDeleteSuccess: () => void;
}

function ArticleCard({ board, onDeleteSuccess }: ArticleCardProps) {
  const { createdAt, likeCount, title, image, writer, id } = board;

  const { articleDetail, error, isFetching } = useArticleDetail(id as number);
  const { user: currentUser, isLoading, error: userError } = useUser(); // 새로 작성한 useUser 훅 사용
  const router = useRouter();
  const { toast } = useToast();

  // 삭제 Mutation 설정
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

  const handleClick = () => {
    router.push(`/board/${id}`);
  };

  // 콘텐츠 일부만 보여주고 "더 보기" 링크 제공
  const renderContentPreview = (
    text: string | undefined,
    maxLength: number,
  ) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

  // 수정하기 및 삭제하기 기능 구현
  const handleEdit = () => {
    router.push({
      pathname: `/board/${id}`,
      query: { isEditing: 'true' },
    });
  };

  // 삭제 기능 구현
  const handleDelete = () => {
    if (window.confirm('정말 이 게시글을 삭제하시겠습니까?')) {
      deleteMutation.mutate();
    }
  };

  if (isFetching || isLoading) {
    return (
      <div className='flex items-center text-text-default font-medium text-md'>
        Loading...
      </div>
    );
  }

  if (error || userError) {
    return (
      <div className='flex items-center text-text-default font-medium text-md'>
        Error loading article detail
      </div>
    );
  }

  // 현재 로그인한 사용자가 작성자인 경우에만 수정/삭제 버튼을 렌더링
  const isOwner = currentUser?.id === writer.id;

  return (
    <>
      {/* 모바일 사이즈 레이아웃 */}
      <button
        type='button'
        onClick={handleClick}
        className='block tablet:hidden tablet:h-220 pt-24 pb-16 px-16 bg-background-secondary rounded-12 border border-background-tertiary relative'
      >
        <div className='flex flex-col'>
          <p className='w-224 h-30 text-lg text-text-secondary font-medium text-left'>
            {renderContentPreview(title, 30)}
          </p>
          <p className='mt-10 w-350 text-md text-text-secondary text-left'>
            {renderContentPreview(articleDetail?.content, 50)}
          </p>
        </div>
        {image && (
          <div className='w-72 h-72 absolute top-15 right-15'>
            <Image src={image} alt='샘플이미지' width={72} height={72} />
          </div>
        )}

        <div className='mt-16 flex justify-between gap-12'>
          <div className='flex items-center gap-12'>
            <ProfileImage userImage={writer.image} size={32} />
            <p className='text-text-primary text-md font-medium '>
              {writer.nickname}
            </p>
            <div className='h-12 border border-background-tertiary' />
            <p className='text-md text-text-disabled flex items-center'>
              {new Date(createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className='flex items-center gap-8'>
            <p className='text-md text-text-disabled flex items-center'>
              {likeCount >= 999 ? '999+' : likeCount}
            </p>
            {isOwner && (
              <div>
                <BoardDropdownMenu
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>
            )}
          </div>
        </div>
      </button>

      {/* 데스크탑 사이즈 레이아웃 */}
      <button
        type='button'
        onClick={handleClick}
        className='hidden tablet:block h-auto pt-24 pb-24 px-32 bg-background-secondary rounded-12 border border-background-tertiary'
      >
        <div className='flex flex-col justify-between h-full'>
          <div className='flex justify-between'>
            <div className='flex flex-col'>
              <p className='w-400 text-2lg leading-relaxed text-text-secondary font-medium text-left'>
                {renderContentPreview(title, 30)}
              </p>
              <p className='mt-12 text-md text-text-secondary text-left'>
                {renderContentPreview(articleDetail?.content, 50)}
              </p>
            </div>
            <div className='flex gap-16'>
              {image && (
                <div className='w-72 h-72'>
                  <Image src={image} alt='샘플이미지' width={72} height={72} />
                </div>
              )}
              {isOwner && (
                <BoardDropdownMenu
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )}
            </div>
          </div>

          <div className='mt-16 flex justify-between gap-16 '>
            <div className='flex items-center gap-10'>
              <ProfileImage userImage={writer.image} size={32} />
              <p className='text-text-primary text-md font-medium '>
                {writer.nickname}
              </p>
              <div className='h-12 border border-background-tertiary' />
              <p className='text-md text-text-disabled'>
                {new Date(createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className='flex items-center gap-8'>
              <IconHeart />
              <p className='text-md text-text-disabled flex items-center'>
                {likeCount >= 999 ? '999+' : likeCount}
              </p>
            </div>
          </div>
        </div>
      </button>
    </>
  );
}

export default ArticleCard;
