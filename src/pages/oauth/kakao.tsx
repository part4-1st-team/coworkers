import { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

function KakaoCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const fetchKakaoToken = async () => {
      const { code } = router.query; // 카카오에서 리디렉션된 URL의 query 파라미터에서 code 추출

      if (code) {
        try {
          // 카카오 인증 서버에 code를 보내서 액세스 토큰 요청
          const kakaoTokenResponse = await axios.post(
            `https://kauth.kakao.com/oauth/token`,
            null,
            {
              params: {
                grant_type: 'authorization_code',
                client_id: 'YOUR_CLIENT_ID', // 카카오 개발자 콘솔에서 발급받은 클라이언트 ID
                redirect_uri: 'http://localhost:3000/oauth/kakao', // 리디렉션 URI
                code, // 카카오 로그인 성공 후 받은 인가 코드
              },
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            },
          );

          const kakaoAccessToken = kakaoTokenResponse.data.access_token;

          // 액세스 토큰을 서버에 전송하여 사용자 인증
          const response = await axios.post('/auth/signIn/kakao', {
            redirectUri: 'http://localhost:3000/oauth/kakao', // 리디렉션 URI
            token: kakaoAccessToken, // 카카오에서 받은 액세스 토큰
          });

          const { accessToken, refreshToken } = response.data;

          // 액세스 토큰 및 리프레시 토큰 저장
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);

          // 로그인 성공 후 원하는 페이지로 리디렉션
          router.push('/group/join-group.index.tsx');
        } catch (error) {
          console.error('카카오 로그인 실패:', error);
        }
      }
    };

    fetchKakaoToken();
  }, [router]);

  return <div>Loading...</div>;
}

export default KakaoCallbackPage;
