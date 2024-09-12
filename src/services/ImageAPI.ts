// import axios from '@/libs/axios';

// /**
//  * 이미지를 API에 업로드해 URL을 얻어내는 함수
//  * @param image 이미지 경로 (string)
//  * @returns (type: ImageURL) api에 저장된 이미지 주소 반환
//  */
// export default async function postImageUpload(
//   image: string,
// ): Promise<ImageURL> {
//   const res = await axios.post(
//     '/images/upload', // 주소
//     { image }, // 객체
//     {
//       headers: {
//         'Content-Type': 'multipart/form-data', // 타입 정의
//       },
//     },
//   );

//   return res.data;
// }

import axios from '@/libs/axios';

/**
 * 이미지를 API에 업로드해 URL을 얻어내는 함수
 * @param image 이미지 파일 (File)
 * @returns (type: ImageURL) api에 저장된 이미지 주소 반환
 */
export default async function postImageUpload(image: File): Promise<ImageURL> {
  const formData = new FormData();
  formData.append('image', image);

  const res = await axios.post(
    '/images/upload', // 주소
    formData, // FormData 객체를 전송
    {
      // Content-Type은 FormData를 사용할 때 자동 설정됨
    },
  );

  return res.data;
}
