import { IconMedal, IconHeart } from '@/assets/IconList';
import ProfileImage from '@/components/member/ProfileImage';
import { useRouter } from 'next/router';
import Image from 'next/image';
import clsx from 'clsx';

interface BestArticleCardProps {
  article: Article;
  className?: string;
}

function BestArticleCard({ article, className }: BestArticleCardProps) {
  const { createdAt, title, image, writer, id, likeCount, isLiked } = article;
  const router = useRouter();

  const handleClick = () => {
    router.push(`/board/${id}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  };

  return (
    <button
      type='button'
      tabIndex={0}
      onKeyPress={handleKeyPress}
      onClick={handleClick}
      className={clsx(
        'w-full tablet:h-220 pt-9 pb-16 px-24',
        'bg-background-secondary dark:bg-background-secondary-dark',
        'rounded-12 border border-background-tertiary dark:border-background-tertiary-dark shadow-md',
        className,
      )}
    >
      <div className='flex gap-4'>
        <IconMedal />
        <p className='text-md text-text-inverse dark:text-text-inverse-dark font-bold'>
          Best
        </p>
      </div>
      {image ? (
        <div className='mt-16 flex justify-between'>
          <p className='w-224 text-2lg leading-relaxed text-text-secondary dark:text-text-secondary-dark font-medium text-left'>
            {title}
          </p>
          <p className='w-72 h-72'>
            <Image src={image} alt='샘플이미지' width={72} height={72} />
          </p>
        </div>
      ) : (
        <p className='mt-16 w-224 h-72 text-2lg leading-relaxed text-text-secondary dark:text-text-secondary-dark font-medium text-left'>
          {title}
        </p>
      )}
      <p className='text-md text-text-disabled dark:text-text-disabled-dark flex items-center'>
        {new Date(createdAt).toLocaleDateString()}
      </p>
      <div className='mt-16 tablet:mt-34 flex justify-between gap-12'>
        <div className='flex items-center gap-12'>
          <div className='w-32 h-32'>
            <ProfileImage userImage={writer.image} size={32} />
          </div>
          <p className='text-text-primary dark:text-text-primary-dark text-sm tablet:text-md font-medium'>
            {writer.nickname}
          </p>
        </div>
        <div className='flex items-center gap-12'>
          <div className='flex gap-4'>
            <IconHeart
              color={isLiked ? 'gray' : 'gray'}
              fill={isLiked ? 'gray' : 'none'}
            />
            <p className='text-md text-text-disabled dark:text-text-disabled-dark flex items-center'>
              {likeCount}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}

export default BestArticleCard;
