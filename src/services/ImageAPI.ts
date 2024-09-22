import axios from '@/libs/axios';

/**
 * 이미지를 API에 업로드해 URL을 얻어내는 함수
 * @param image 이미지 경로 (string)
 * @returns (type: ImageURL) api에 저장된 이미지 주소 반환
 */
export default async function postImageUpload(image: Blob): Promise<ImageURL> {
  const res = await axios.post(
    '/images/upload', // 주소
    { image }, // 객체
    {
      headers: {
        'Content-Type': 'multipart/form-data', // 타입 정의
      },
    },
  );

  return res.data;
}
