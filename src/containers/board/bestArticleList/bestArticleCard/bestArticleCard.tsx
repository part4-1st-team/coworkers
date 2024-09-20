/* eslint-disable jsx-a11y/click-events-have-key-events */
import { IconMedal, IconHeart } from '@/assets/IconList';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface BestArticleCardProps {
  board: Article;
}

function BestArticleCard({ board }: BestArticleCardProps) {
  const { createdAt, likeCount, title, image, writer, id } = board;
  const router = useRouter();

  const handleClick = () => {
    router.push(`/board/${id}`);
  };

  return (
    <div
      role='button'
      tabIndex={0}
      onClick={handleClick}
      className='w-full tablet:h-220 pt-9 pb-16 px-24 bg-background-secondary rounded-12 border border-background-tertiary'
    >
      <div className=' flex gap-4'>
        <IconMedal />
        <p className='text-md text-text-inverse font-bold'>Best</p>
      </div>
      {image ? (
        <div className='mt-16 flex justify-between'>
          <p className='w-224 text-2lg leading-relaxed text-text-secondary font-medium'>
            {title}
          </p>
          <p className='w-72 h-72'>
            <Image src={image} alt='샘플이미지' width={72} height={72} />
          </p>
        </div>
      ) : (
        <p className='mt-16 w-224 h-72 text-2lg leading-relaxed text-text-secondary font-medium'>
          {title}
        </p>
      )}
      <p className='text-md text-text-disabled flex items-center'>
        {new Date(createdAt).toLocaleDateString()}
      </p>
      <div className='mt-16 tablet:mt-34 flex justify-between gap-12 '>
        <div className='flex items-center gap-12'>
          <div className='w-32 h-32 pb-12 rounded-[9999px]'>{writer.image}</div>
          <p className='text-text-primary text-md font-medium '>
            {writer.nickname}
          </p>
        </div>
        <div className='flex items-center gap-12'>
          <IconHeart />
          <p className='h- text-md text-text-disabled flex items-center'>
            <span>{likeCount}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default BestArticleCard;
