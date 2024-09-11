/* eslint-disable jsx-a11y/click-events-have-key-events */

import { IconMedal, IconHeart } from '@/assets/IconList';
import Image from 'next/image';
import BoardImage from '@/assets/images/img_Mask_group.png';

function BestArticleCard() {
  return (
    <div className='w-full tablet:h-220 pt-9 pb-16 px-16 bg-background-secondary rounded-12 border border-background-tertiary'>
      <div className=' flex gap-4'>
        <IconMedal />
        <p className='text-md text-text-inverse font-bold'>Best</p>
      </div>
      <div className='mt-10 flex justify-between'>
        <p className='w-224 text-lg text-text-secondary font-medium'>
          게시글 내용
        </p>
        <Image src={BoardImage} alt='샘플이미지' width={72} height={72} />
      </div>
      <p className='text-md text-text-disabled flex items-center'>2024.07.25</p>
      <div className='mt-16 flex justify-between gap-12 '>
        <div className='flex items-center gap-12'>
          <div className='w-32 h-32 pb-12 rounded-[9999px] bg-white' />
          {/* TODO : 프로필 컴포넌트로 변경하기 */}
          <p className='text-text-primary text-md font-medium '>우지은</p>
          {/* TODO : 프로필 컴포넌트로 변경하기 */}
        </div>
        <div className='flex items-center gap-12'>
          <IconHeart />
          <p className='text-md text-text-disabled flex items-center'>9999+</p>
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
