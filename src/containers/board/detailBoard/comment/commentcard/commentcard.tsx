import BoardProfile from '@/components/profile/boardProfile';
import { IconKebabSmall, IconHeart } from '@/assets/IconList';

interface CommentCardProps {
  comment: ArticleComment;
}

function CommentCard({ comment }: CommentCardProps) {
  // comment 객체를 구조 분해하여 필요한 속성만 추출
  const { content, writer, createdAt } = comment;
  return (
    <div className='pt-24 pb-24 px-32 bg-background-secondary rounded-12 border border-background-tertiary'>
      <div className='flex flex-col justify-between h-full'>
        <div className='mt-10 flex justify-between'>
          <p className='w-auto text-lg text-text-secondary font-medium'>
            {content}
          </p>
          <IconKebabSmall />
        </div>
        <div className='mt-32 flex justify-between gap-16 '>
          <div className='flex items-center gap-10'>
            <div className='w-32 h-32 '>
              <BoardProfile
                size={32}
                nickname={writer.nickname}
                image={writer.image}
              />
            </div>
            <p className='text-text-primary text-md font-medium '>
              {writer.nickname}
            </p>
            <div className='h-12 border border-background-tertiary' />
            <p className='text-md text-text-disabled '>
              {new Date(createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
