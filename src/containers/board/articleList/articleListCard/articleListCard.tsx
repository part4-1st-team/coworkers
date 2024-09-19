/* eslint-disable jsx-a11y/click-events-have-key-events */
import Image from 'next/image';
import { useRouter } from 'next/router';
import { IconKebabSmall, IconKebabLarge, IconHeart } from '@/assets/IconList';
import { Article } from '@/types/Article';
import Dropdown from '@/components/dropdown/Dropdown';
import useDropdown from '@/hooks/useDropdown';

interface ArticleCardProps {
  board: Article;
}

function ArticleCard({ board }: ArticleCardProps) {
  const { isOpen, handleToggleDropdown, handleOffDropdown } = useDropdown();
  const { createdAt, likeCount, title, image, writer, id } = board;

  const router = useRouter();

  const handleClick = () => {
    router.push(`/board/${id}`);
  };

  return (
    <>
      {/* 모바일 사이즈 레이아웃 */}
      <div
        role='button'
        onClick={handleClick}
        tabIndex={0}
        className='block tablet:hidden tablet:h-220 pt-24 pb-16 px-16 bg-background-secondary rounded-12 border border-background-tertiary relative'
      >
        {image ? (
          <div className='flex justify-between'>
            <p className='w-224 text-lg text-text-secondary font-medium'>
              {title}
            </p>
            <p className='w-72 h-72'>
              <Image src={image} alt='샘플이미지' width={72} height={72} />
            </p>
          </div>
        ) : (
          <p className='w-224 h-72 text-lg text-text-secondary font-medium'>
            {title}
          </p>
        )}

        <p className='text-md text-text-disabled mt-12 flex items-center'>
          {new Date(createdAt).toLocaleDateString()}
        </p>
        <div className='mt-16 flex justify-between gap-12'>
          <div className='flex items-center gap-12'>
            <div className='w-32 h-32 pb-12 rounded-[9999px]'>
              {writer.image}
            </div>
            <p className='text-text-primary text-md font-medium '>
              {writer.nickname}
            </p>
          </div>
          <div className='flex items-center gap-8'>
            <p className='text-md text-text-disabled flex items-center'>
              {likeCount}
            </p>
            <div className=''>
              <Dropdown onClose={handleOffDropdown}>
                <Dropdown.Trigger onClick={handleToggleDropdown}>
                  <IconKebabSmall />
                </Dropdown.Trigger>
                <Dropdown.Menu isOpen={isOpen} className='right-10'>
                  <Dropdown.List onClick={() => console.log('자유게시판')}>
                    수정하기
                  </Dropdown.List>
                  <Dropdown.List onClick={() => console.log('로그아웃')}>
                    삭제하기
                  </Dropdown.List>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>

      {/* 데스크탑 사이즈 레이아웃 */}
      <div
        role='button'
        onClick={handleClick}
        tabIndex={0}
        className='hidden tablet:block h-220 pt-24 pb-24 px-32 bg-background-secondary rounded-12 border border-background-tertiary'
      >
        <div className='flex flex-col justify-between h-full'>
          <div className='flex justify-between'>
            <p
              className={`w-224 ${image ? '' : 'h-72'} text-2lg leading-relaxed text-text-secondary font-medium`}
            >
              {title}
            </p>
            <div className='flex gap-16'>
              {image && (
                <div className='w-72 h-72'>
                  <Image src={image} alt='샘플이미지' width={72} height={72} />
                </div>
              )}
              <Dropdown onClose={handleOffDropdown}>
                <Dropdown.Trigger onClick={handleToggleDropdown}>
                  <IconKebabLarge />
                </Dropdown.Trigger>
                <Dropdown.Menu isOpen={isOpen} className='right-10'>
                  <Dropdown.List onClick={() => console.log('수정하기')}>
                    수정하기
                  </Dropdown.List>
                  <Dropdown.List onClick={() => console.log('삭제하기')}>
                    삭제하기
                  </Dropdown.List>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>

          <div className='mt-16 flex justify-between gap-16 '>
            <div className='flex items-center gap-10'>
              <div className='w-32 h-32 pb-12 rounded-[9999px]'>
                {writer.image}
              </div>
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
                {likeCount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ArticleCard;
