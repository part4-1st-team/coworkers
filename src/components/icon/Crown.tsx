import IconCrown from '@/assets/images/img_crown.png';
import Image from 'next/image';

function CrownIcon({ size = 12 }: { size?: number }) {
  return <Image src={IconCrown} alt='왕관 아이콘' width={size} height={size} />;
}

export default CrownIcon;
