import BestArticleCard from './bestArticleCard/bestArticleCard';

function BestArticleList() {
  return (
    <div className='flex flex-col gap-24 tablet:gap-40'>
      <div className='flex justify-between'>
        <div className='text-lg font-medium tablet:text-xl tablet:font-bold text-text-primary'>
          베스트 게시글
        </div>
        <div className='text-sm tablet:text-md text-text-disabled'>더보기</div>
      </div>
      <div className='flex gap-16'>
        <div className='flex-grow tablet:h-220 '>
          <BestArticleCard />
        </div>
        <div className='hidden tablet:flex-grow tablet:block'>
          <BestArticleCard />
        </div>
        <div className='hidden desktop:flex-grow desktop:block'>
          <BestArticleCard />
        </div>
      </div>

      <div className='w-full border-t border-border-primary' />
    </div>
  );
}

export default BestArticleList;

// import { useState, useEffect } from 'react';
// import { getArticleDetail } from '@/services/ArticleAPI';
// import BestArticleCard from './bestArticleCard/bestArticleCard';

// function BestArticleList() {
//   const [bestBoards, setBestBoards] = useState<PatchResponseArticle[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchArticles = async () => {
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
//     <div className='flex flex-col gap-24 tablet:gap-40'>
//       <div className='flex justify-between'>
//         <div className='text-lg font-medium tablet:text-xl tablet:font-bold text-text-primary'>
//           베스트 게시글
//         </div>
//         <div className='text-sm tablet:text-md text-text-disabled'>더보기</div>
//       </div>
//       <div className='flex gap-16'>
//         <div className='flex-grow tablet:h-220 '>
//           <BestArticleCard />
//         </div>
//         <div className='hidden tablet:flex-grow tablet:block'>
//           <BestArticleCard />
//         </div>
//         <div className='hidden desktop:flex-grow desktop:block'>
//           <BestArticleCard />
//         </div>
//       </div>

//       <div className='w-full border-t border-border-primary' />
//     </div>
//   );
// }

// export default BestArticleList;
