import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useToast from '@/components/toast/useToast';
import axios from 'axios';

const STATE = 'someRandomState'; // 상태를 임의로 지정
const CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID; // 카카오 개발자 콘솔에서 발급받은 클라이언트 ID
const REDIRECT_URI = 'http://localhost:3000/oauth/kakao'; // 카카오 로그인 후 리디렉션될 URI

function KakaoSignIn() {
  const router = useRouter();
  const { toast } = useToast();

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
              client_id: CLIENT_ID!,
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

          // 백엔드 응답을 토스트로 표시
          toast(
            'Success',
            `카카오 로그인 성공: ${backendResponse.data.message}`,
          );
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            // AxiosError일 경우
            toast('Error', `카카오 로그인 실패: ${error.response?.data}`);
          } else if (error instanceof Error) {
            // 일반 Error일 경우
            toast('Error', `카카오 로그인 실패: ${error.message}`);
          } else {
            // 그 외의 경우
            toast('Error', '카카오 로그인 실패: 알 수 없는 오류 발생');
          }
        }
      }
    };

    fetchKakaoToken();
  }, [router, toast]);

  return <div>카카오 로그인 중...</div>;
}

export default KakaoSignIn;
