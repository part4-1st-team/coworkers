import { useEffect } from 'react';
import axios from '@/libs/axios';
import { isAxiosError } from 'axios';
import { KAKAO_CLIENT_ID, KAKAO_REDIRECT_URI } from '@/constants/authConstants';
import qs from 'qs'; // qs 라이브러리 임포트
import { useRouter } from 'next/router';

function KakaoSignIn() {
  const router = useRouter();

  useEffect(() => {
    const { code, state } = router.query; // code와 state를 router.query에서 추출
    const redirectUrl = router.asPath; // 현재 URL을 변수에 저장

    if (!code && !state) return; // code가 없으면 요청 중단

    const fetchKakaoToken = async () => {
      try {
        console.log('카카오 토큰 요청');
        console.log(redirectUrl);

        // URL 인코딩된 데이터 생성
        const params = qs.stringify({
          grant_type: 'authorization_code',
          client_id: KAKAO_CLIENT_ID!,
          redirect_uri: KAKAO_REDIRECT_URI,
          code: code as string,
        });

        // 카카오 토큰 요청
        const kakaoTokenResponse = await axios.post(
          `https://kauth.kakao.com/oauth/token`,
          params,
          {
            headers: {
              'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
          },
        );

        // 콘솔에 액세스 토큰 출력
        const kakaoAccessToken = kakaoTokenResponse.data.access_token;
        console.log(kakaoAccessToken);
        console.log(state);

        // 백엔드에 토큰 전송
        const backendResponse = await axios.post(
          `/auth/signIn/KAKAO`, // 상대 경로 사용
          {
            state: String(state),
            redirectUri: KAKAO_REDIRECT_URI,
            token: kakaoAccessToken,
          },
        );

        console.log('백엔드 리스폰스', backendResponse);

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
  }, [router.query]);

  return <div>카카오 로그인 중...</div>;
}

export default KakaoSignIn;
