import Image from 'next/image';
import IconEmail from '@/assets/images/ic_mail.png';
import IconEmailLight from '@/assets/images/ic_mail_light.png';

function EmailIcon({ size, theme }: { size: number; theme: 'light' | 'dark' }) {
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
