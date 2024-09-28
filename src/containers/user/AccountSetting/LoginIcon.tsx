import EmailIcon from '@/components/icon/Email';
import GoogleIcon from '@/components/icon/Google';
import KakaoIcon from '@/components/icon/Kakao';
import TooltipWrapper from '@/components/tooltip/TooltipWrapper';
import { useTheme } from '@/hooks/useThemeContext';

function LoginIcon({ loginType }: { loginType: 'kakao' | 'google' | null }) {
  const { theme } = useTheme();

  let message;
  let IconComponent;

  if (!loginType) {
    message = '이메일로 로그인하셨습니다.';
    IconComponent = <EmailIcon size={24} theme={theme} />;
  } else if (loginType === 'kakao') {
    message = '카카오톡으로 로그인하셨습니다.';
    IconComponent = <KakaoIcon size={24} />;
  } else {
    message = '구글로 로그인하셨습니다.';
    IconComponent = <GoogleIcon size={24} />;
  }

  return <TooltipWrapper message={message}>{IconComponent}</TooltipWrapper>;
}

export default LoginIcon;
