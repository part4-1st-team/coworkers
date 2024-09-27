import { IconHandLike } from '@/assets/IconList';

interface IconHandLikeProps {
  icon: 'Like' | 'DisLike';
}

function LikeIcon({ icon }: IconHandLikeProps) {
  if (icon === 'Like') {
    return (
      <div className='flex flex-row gap-8'>
        <IconHandLike />
        <p className='text-text-primary dark:text-text-primary-dark text-md'>
          22
        </p>
      </div>
    );
  }

  if (icon === 'DisLike') {
    return (
      <div className='flex flex-row gap-8'>
        <IconHandLike className='ml-10 transform rotate-180' />
        <p className='text-text-primary dark:text-text-primary-dark text-md'>
          4
        </p>
      </div>
    );
  }
}

export default LikeIcon;
