import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from '@/libs/axios';
import useUserStore from '@/stores/userStore';
import useToast from '@/components/toast/useToast'; // useToast 훅 가져오기
import {
  GOOGLE_REDIRECT_URI,
  GOOGLE_CLIENT_ID,
} from '@/constants/authConstants';

function GoogleOAuth() {
  const router = useRouter();
  const { code, state } = router.query; // URL에서 code와 state 추출
  const { setLogin } = useUserStore(); // 로그인 후 유저 정보를 저장할 상태 관리
  const { toast } = useToast(); // useToast 훅을 호출하여 toast 함수 가져오기
  // 로딩 상태
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGoogleToken = async () => {
      if (code && state && GOOGLE_CLIENT_ID) {
        try {
          console.log('구글 간편 로그인 시작');
          // 로딩 시작
          setIsLoading(true);

          // 구글 토큰 요청 파라미터 설정
          const params = new URLSearchParams({
            code: String(code),
            client_id: GOOGLE_CLIENT_ID,
            redirect_uri: GOOGLE_REDIRECT_URI,
            grant_type: 'authorization_code',
          });

          // 구글 서버에 토큰 요청
          const googleTokenResponse = await axios.post(
            'https://oauth2.googleapis.com/token',
            params,
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            },
          );

          const { access_token: googleAccessToken } = googleTokenResponse.data;

          // 백엔드로 code를 전송하여 구글 토큰을 요청
          const response = await axios.post('/auth/signIn/google', {
            state: String(state),
            redirectUri: GOOGLE_REDIRECT_URI, // 구글 리디렉트 URI
            token: googleAccessToken, // URL에서 추출한 code를 token으로 전송
          });

          const { user, accessToken, refreshToken } = response.data;

          // 유저 정보 및 토큰 저장
          setLogin(user, accessToken, refreshToken, 'google');

          // 성공적으로 로그인된 후 원하는 페이지로 리디렉션
          router.push('group/join-Group');
        } catch (error) {
          // 오류 시 toast를 호출
          toast('Error', 'Google OAuth 로그인 중 오류 발생');
          // 오류가 발생한 경우 처리 (예: 오류 페이지로 이동)
          router.push('/auth/signin?error=google_login_failed');
        } finally {
          // 로딩 종료
          setIsLoading(false);
        }
      }
    };

    fetchGoogleToken();
  }, [code, state, router, setLogin, toast]);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p>Google 로그인 처리 중...</p>
      </div>
    );
  }

  return null;
}

export default GoogleOAuth;
