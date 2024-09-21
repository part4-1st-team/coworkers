import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useToast from '@/components/toast/useToast';
import axios from '@/libs/axios';
import { isAxiosError } from 'axios';

const CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID; // 카카오 개발자 콘솔에서 발급받은 클라이언트 ID
const REDIRECT_URI = 'http://localhost:3000/oauth/kakao'; // 카카오 로그인 후 리디렉션될 URI

function KakaoSignIn() {
  const router = useRouter();
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // const { state } = router.query;
    const code = new URL(window.location.href).searchParams.get('code');

    // code가 없으면 return하여 요청 중단
    console.log(code, CLIENT_ID);
    if (!code) return;

    const fetchKakaoToken = async () => {
      try {
        // 카카오 토큰 요청
        const kakaoTokenResponse = await axios.post(
          `https://kauth.kakao.com/oauth/token`,
          {
            grant_type: 'authorization_code',
            client_id: CLIENT_ID!, // Type assertion을 통해 null 체크
            redirect_uri: REDIRECT_URI,
            code: code as string,
          },
          {
            headers: {
              'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
          },
        );

        const kakaoAccessToken = kakaoTokenResponse.data.access_token;
        console.log(kakaoAccessToken);
        // 백엔드에 토큰 전송
        // const backendResponse = await axios.post(
        //   `/auth/signIn/kakao`, // 상대 경로 사용
        //   {
        //     state: String(state),
        //     redirectUri: REDIRECT_URI,
        //     token: kakaoAccessToken,
        //   },
        // );

        // 백엔드 응답을 토스트로 표시
        // toast('Success', `카카오 로그인 성공: ${backendResponse.data.message}`);

        // 로그인 후 리디렉션 처리
        router.replace('/'); // 성공 후 홈으로 이동, 원하는 경로로 변경 가능
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          // AxiosError일 경우
          console.log(error);
          toast('Error', `카카오 로그인 실패: ${error.response?.data}`);
        } else if (error instanceof Error) {
          // 일반 Error일 경우
          console.log(error);
          toast('Error', `카카오 로그인 실패: ${error.message}`);
        } else {
          // 그 외의 경우
          toast('Error', '카카오 로그인 실패: 알 수 없는 오류 발생');
        }
      }
    };

    if (!mounted) {
      fetchKakaoToken();
      setMounted(true);
    }
  }, [mounted]);

  return <div>카카오 로그인 중...</div>;
}

export default KakaoSignIn;
