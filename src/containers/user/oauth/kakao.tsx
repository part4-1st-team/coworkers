import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const STATE = 'someRandomState'; // 상태를 임의로 지정
const CLIENT_ID = 'a9ead47c79fd85ed6ae8f21be7e45db5'; // 카카오 개발자 콘솔에서 발급받은 클라이언트 ID
const REDIRECT_URI = 'http://localhost:3000/oauth/kakao'; // 카카오 로그인 후 리디렉션될 URI

function KakaoSignIn() {
  const router = useRouter();

  useEffect(() => {
    const fetchKakaoToken = async () => {
      const { code } = router.query;

      if (code) {
        try {
          // 카카오 토큰 요청
          const kakaoTokenResponse = await axios.post(
            `https://kauth.kakao.com/oauth/token`,
            new URLSearchParams({
              grant_type: 'authorization_code',
              client_id: CLIENT_ID,
              redirect_uri: REDIRECT_URI,
              code: String(code),
            }),
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            },
          );

          const kakaoAccessToken = kakaoTokenResponse.data.access_token;
          console.log('카카오 Access Token:', kakaoAccessToken);

          // 백엔드에 토큰 전송
          const backendResponse = await axios.post(
            `https://fe-project-cowokers.vercel.app/7-1/auth/signIn/kakao`,
            {
              state: STATE,
              redirectUri: 'http://localhost:3000/oauth/kakao',
              token: kakaoAccessToken,
            },
            {
              headers: {
                'Content-Type': 'application/json', // JSON 형식으로 전송
              },
            },
          );

          console.log('백엔드 응답:', backendResponse.data);
        } catch (error) {
          if (error.response) {
            console.error('카카오 로그인 실패:', error.response.data);
          } else {
            console.error('카카오 로그인 실패:', error.message);
          }
        }
      }
    };

    fetchKakaoToken();
  }, [router.query.code]);

  return <div>카카오 로그인 중...</div>;
}

export default KakaoSignIn;
