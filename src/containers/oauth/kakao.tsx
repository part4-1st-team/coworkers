import { useEffect, useState } from 'react';
import axios from '@/libs/axios';
import { isAxiosError } from 'axios';
import { KAKAO_CLIENT_ID, KAKAO_REDIRECT_URI } from '@/constants/authConstants';

function KakaoSignIn() {
  const router = useRouter();

  useEffect(() => {
    const { code, state } = router.query; // code와 state를 router.query에서 추출
    const redirectUrl = router.asPath; // 현재 URL을 변수에 저장

    if (!code) return; // code가 없으면 요청 중단

    const fetchKakaoToken = async () => {
      try {
        console.log('카카오 토큰 요청');

        // 카카오 토큰 요청
        const kakaoTokenResponse = await axios.post(
          `https://kauth.kakao.com/oauth/token`,
          {
            grant_type: 'authorization_code',
            client_id: KAKAO_CLIENT_ID!, // Type assertion을 통해 null 체크
            redirect_uri: redirectUrl,
            code: code as string,
          },
          {
            headers: {
              'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
          },
        );

        const kakaoAccessToken = kakaoTokenResponse.data.access_token;
        // 백엔드에 토큰 전송
        const backendResponse = await axios.post(
          `/auth/signIn/kakao`, // 상대 경로 사용
          {
            state: String(state),
            redirectUri: KAKAO_REDIRECT_URI,
            token: kakaoAccessToken,
          },
        );

        console.log('카카오 로그인 성공');

        // 로그인 후 리디렉션 처리
        router.replace('/'); // 성공 후 홈으로 이동, 원하는 경로로 변경 가능
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          // AxiosError일 경우
          console.log(error);
        } else if (error instanceof Error) {
          // 일반 Error일 경우
          console.log(error);
        } else {
          // 그 외의 경우
          console.log('카카오 로그인 실패(알 수 없는 오류)', error);
        }
      }
    };

    fetchKakaoToken();
  });

  return <div>카카오 로그인 중...</div>;
}

export default KakaoSignIn;
