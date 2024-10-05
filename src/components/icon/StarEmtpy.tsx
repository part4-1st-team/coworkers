import Image from 'next/image';
import IconStarEmpty from '@/assets/images/ic_star_empty.png';

function StarEmptyIcon({ size = 20 }: IconProps) {
  return (
    <Image
      src={IconStarEmpty}
      alt='비어있는 별 아이콘'
      width={size}
      height={size}
    />
  );
}

export default StarEmptyIcon;
