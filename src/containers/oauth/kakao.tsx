import { useEffect } from 'react';
import axios from '@/libs/axios';
import { isAxiosError } from 'axios';
import { KAKAO_REDIRECT_URI } from '@/constants/authConstants';
import { useRouter } from 'next/router';
import useUserStore from '@/stores/userStore';

function KakaoSignIn() {
  const router = useRouter();
  const { setLogin } = useUserStore();

  useEffect(() => {
    const { code } = router.query; // code와 state를 router.query에서 추출

    if (!code) return; // code가 없으면 요청 중단

    const fetchKakaoToken = async () => {
      try {
        // 백엔드에 토큰 전송
        const backendResponse = await axios.post(
          `/auth/signIn/KAKAO`, // 상대 경로 사용
          {
            // state: String(state),
            redirectUri: KAKAO_REDIRECT_URI,
            token: code as string,
          },
        );
        const { user, accessToken, refreshToken } = backendResponse.data;

        setLogin(user, accessToken, refreshToken, 'kakao');
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
