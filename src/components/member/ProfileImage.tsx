import Image from 'next/image';

// 기본 이미지 및 사이즈 설정
const defaultImage = '/svgs/ic_member.svg';
const size = {
  lg: 32,
  sm: 24,
};

interface ProfileImageProps {
  userImage?: string;
}

function profileImage({ userImage }: ProfileImageProps) {
  return (
    <div className='flex justify-center items-center'>
      <Image
        src={userImage || defaultImage}
        alt='프로필 이미지'
        width={size.lg}
        height={size.lg}
        className='rounded-full object-cover'
      />
    </div>
  );
}

// lint 경고를 피하기 위한 default props 설정
profileImage.defaultProps = {
  userImage: null, // 기본값 설정
};

export default profileImage;
