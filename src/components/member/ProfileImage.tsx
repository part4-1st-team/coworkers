import clsx from 'clsx';
import Image from 'next/image';

// 기본 이미지 및 사이즈 설정
const defaultImage = '/svgs/ic_member.svg';

interface ProfileImageProps {
  userImage: string | null;
  size?: number;
  className?: string;
}

function ProfileImage({ userImage, size = 32, className }: ProfileImageProps) {
  return (
    <Image
      src={userImage || defaultImage}
      alt='프로필 이미지'
      width={size}
      height={size}
      className={clsx(
        'rounded-full border-2 border-background-tertiary border-opacity-10 flex items-center',
        'shadow-md',
        className,
      )}
      priority
    />
  );
}

export default ProfileImage;
