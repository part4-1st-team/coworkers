import axios from '@/libs/axios';

/**
 * 이미지를 API에 업로드해 URL을 얻어내는 함수
 * @param file 이미지 파일 (File)
 * @returns (type: ImageURL) api에 저장된 이미지 주소 반환
 */
export default async function postImageUpload(image: Blob): Promise<ImageURL> {
  const formData = new FormData(); // FormData 선언
  formData.append('file', image); // 'file'은 API에서 기대하는 key로 설정

  const res = await axios.post(
    '/images/upload', // 주소
    formData, // FormData 객체를 요청 본문으로 설정
    {
      headers: {
        'Content-Type': 'multipart/form-data', // 타입 정의
      },
    },
  );

  return res.data;
}
