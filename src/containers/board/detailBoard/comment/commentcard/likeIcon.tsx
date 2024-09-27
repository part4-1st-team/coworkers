import { IconHandLike } from '@/assets/IconList';

interface IconHandLikeProps {
  icon: 'Like' | 'DisLike';
}

function LikeIcon({ icon }: IconHandLikeProps) {
  if (icon === 'Like') {
    return (
      <div>
        <IconHandLike />
        <p className='text-text-primary text-md'>4</p>
      </div>
    );
  }

  if (icon === 'DisLike') {
    return (
      <div>
        <IconHandLike className='ml-10 transform rotate-180' />
        <p className='text-text-primary text-md'>100</p>
      </div>
    );
  }
}

export default LikeIcon;
