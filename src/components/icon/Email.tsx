import Image from 'next/image';
import IconEmail from '@/assets/images/ic_mail.png';
import IconEmailLight from '@/assets/images/ic_mail_light.png';

interface EmailIconProps extends IconProps {
  theme: 'light' | 'dark';
}

function EmailIcon({ size, theme }: EmailIconProps) {
  return (
    <Image
      src={theme === 'light' ? IconEmail : IconEmailLight}
      alt='이메일'
      width={size}
      height={size}
    />
  );
}

export default EmailIcon;
