// cookieUtils.ts
import Cookies from 'js-cookie';

// 토큰 저장
export const setTokenCookies = (accessToken: string, refreshToken: string) => {
  Cookies.set('accessToken', accessToken, { expires: 1 }); // 1일 후 만료
  Cookies.set('refreshToken', refreshToken, { expires: 7 }); // 7일 후 만료
};

// 토큰 삭제
export const removeTokenCookies = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
};

// 토큰 가져오기
export const getAccessToken = () => Cookies.get('accessToken');
export const getRefreshToken = () => Cookies.get('refreshToken');
