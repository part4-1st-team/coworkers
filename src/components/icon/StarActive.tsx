import Image from 'next/image';
import IconStarActive from '@/assets/images/ic_star_active.png';

function StarActiveIcon({ size = 20 }: IconProps) {
  return (
    <Image src={IconStarActive} alt='별 아이콘' width={size} height={size} />
  );
}

export default StarActiveIcon;
