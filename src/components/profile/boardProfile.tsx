import Image from 'next/image';
import { IconProfileLarge } from '@/assets/IconList'; // 아이콘 가져오기

interface BoardProfileProps {
  image?: string | null;
  nickname: string;
  size?: number;
}

function BoardProfile({ image, nickname, size = 32 }: BoardProfileProps) {
  return (
    <div className={`w-${size} h-${size} `}>
      {image ? (
        <Image
          src={image}
          alt={`${nickname}의 프로필`}
          width={size}
          height={size}
          className='rounded-full'
        />
      ) : (
        <IconProfileLarge
          className='w-full h-full'
          width={size}
          height={size}
        />
      )}
    </div>
  );
}

export default BoardProfile;
