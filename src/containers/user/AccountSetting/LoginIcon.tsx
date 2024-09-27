import EmailIcon from '@/components/icon/Email';
import GoogleIcon from '@/components/icon/Google';
import KakaoIcon from '@/components/icon/Kakao';
import TooltipWrapper from '@/components/tooltip/TooltipWrapper';
import { useTheme } from '@/hooks/useThemeContext';

function LoginIcon({ loginType }: { loginType: 'kakao' | 'google' | null }) {
  const message = !loginType
    ? '이메일로 로그인하셨습니다.'
    : loginType === 'kakao'
      ? '카카오톡으로 로그인하셨습니다.'
      : '구글로 로그인하셨습니다.';

  const { theme } = useTheme();

  return (
    <TooltipWrapper message={message}>
      {!loginType ? (
        <EmailIcon size={24} theme={theme} />
      ) : loginType === 'kakao' ? (
        <KakaoIcon size={24} />
      ) : (
        <GoogleIcon size={24} />
      )}
    </TooltipWrapper>
  );
}

export default LoginIcon;
