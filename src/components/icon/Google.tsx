import IconGoogle from '@/assets/images/img_google.png';
import Image from 'next/image';

function GoogleIcon({ size }: { size: number }) {
  return <Image src={IconGoogle} width={size} height={size} alt='카카오톡' />;
}

export default GoogleIcon;
