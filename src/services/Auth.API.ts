import axios from '@/libs/axios';
import { isAxiosError } from 'axios';

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

// 로그인 API
async function login(payload: LoginPayload): Promise<LoginResponse> {
  try {
    const response = await axios.post<LoginResponse>(
      '/auth/signIn',
      payload,
      {},
    );
    // eslint-disable-next-line no-console
    console.log(response);
    return response.data;
  } catch (error) {
    // 오류 처리
    if (isAxiosError(error) && error.response) {
      const errorMessage =
        error.response?.data?.message || 'An unknown error occurred';
      // eslint-disable-next-line no-console
      console.error('API error:', errorMessage);
    } else {
      // eslint-disable-next-line no-console
      console.error('Unexpected error:', error);
      throw new Error('Unexpected error occurred');
    }
    throw error;
  }
}

export default login;

// 회원가입 API
interface SignupData {
  nickname: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export async function signup(data: SignupData) {
  try {
    const response = await axios.post('/auth/signUp', data);
    // eslint-disable-next-line no-console
    console.log('회원가입 성공:', response.data);
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      // eslint-disable-next-line no-console
      console.error('회원가입 실패:', error.response?.data || error.message);
    } else {
      // eslint-disable-next-line no-console
      console.error('회원가입 실패:', error);
    }
    throw error;
  }
}

// 비밀번호 재설정 API
interface PasswordResetData {
  password: string;
  passwordConfirmation: string;
  token: string;
}

export async function resetPassword(data: PasswordResetData) {
  try {
    const response = await axios.patch('/user/reset-password', data); // PATCH로 수정
    console.log('비밀번호 재설정 성공:', response.data);
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error(
        '비밀번호 재설정 실패:',
        error.response?.data || error.message,
      );
    } else {
      console.error('비밀번호 재설정 실패:', error);
    }
    throw error;
  }
}

// AuthAPI.ts - 비밀번호 재설정 이메일 발송 API
export async function sendResetPasswordEmail(
  email: string,
  redirectUrl: string,
) {
  try {
    const response = await axios.post('/user/send-reset-password-email', {
      email,
      redirectUrl,
    });
    console.log('비밀번호 재설정 이메일 발송 성공:', response.data);
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error('이메일 발송 실패:', error.response?.data || error.message);
    } else {
      console.error('이메일 발송 실패:', error);
    }
    throw error;
  }
}
