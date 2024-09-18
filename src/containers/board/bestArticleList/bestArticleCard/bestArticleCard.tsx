/* eslint-disable jsx-a11y/click-events-have-key-events */
import { IconMedal, IconHeart } from '@/assets/IconList';
import { useRouter } from 'next/router';
import { Article } from '@/types/Article';
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
          <div className='w-32 h-32 pb-12 rounded-[9999px] bg-white' />
          {/* TODO : 프로필 컴포넌트로 변경하기 */}
          <p className='text-text-primary text-md font-medium '>
            {writer.nickname}
          </p>
          {/* TODO : 프로필 컴포넌트로 변경하기 */}
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

/* eslint-disable jsx-a11y/click-events-have-key-events */

// import { IconMedal, IconHeart } from '@/assets/IconList';
// import { getArticleDetail } from '@/services/ArticleAPI';
// import Image from 'next/image';
// import BoardImage from '@/assets/images/img_Mask_group.png';

// function BestArticleCard() {

//   const fetchArticlesDetail = async () => {
//     try {
//       const data = await getArticleDetail({
//         page: 1,
//         pageSize: 3,
//         orderBy: 'like',
//       });
//       const response = data.data;
//       setBestBoards(response.list);
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchArticles();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className='w-full tablet:h-220 pt-9 pb-16 px-16 bg-background-secondary rounded-12 border border-background-tertiary'>
//       <div className=' flex gap-4'>
//         <IconMedal />
//         <p className='text-md text-text-inverse font-bold'>Best</p>
//       </div>
//       <div className='mt-10 flex justify-between'>
//         <p className='w-224 text-lg text-text-secondary font-medium'>
//           게시글 내용
//         </p>
//         <Image src={BoardImage} alt='샘플이미지' width={72} height={72} />
//       </div>
//       <p className='text-md text-text-disabled flex items-center'>2024.07.25</p>
//       <div className='mt-16 flex justify-between gap-12 '>
//         <div className='flex items-center gap-12'>
//           <div className='w-32 h-32 pb-12 rounded-[9999px] bg-white' />
//           {/* TODO : 프로필 컴포넌트로 변경하기 */}
//           <p className='text-text-primary text-md font-medium '>우지은</p>
//           {/* TODO : 프로필 컴포넌트로 변경하기 */}
//         </div>
//         <div className='flex items-center gap-12'>
//           <IconHeart />
//           <p className='text-md text-text-disabled flex items-center'>9999+</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BestArticleCard;
