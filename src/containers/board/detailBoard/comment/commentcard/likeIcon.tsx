import { IconHandLike } from '@/assets/IconList';
import clsx from 'clsx';

interface IconHandLikeProps {
  icon: 'Like' | 'DisLike';
}

function LikeIcon({ icon }: IconHandLikeProps) {
  return (
    <div className='flex flex-row gap-4 tablet:gap-8'>
      <IconHandLike
        className={clsx({
          'ml-10 transform rotate-180': icon === 'DisLike',
        })}
      />
      <p className='text-text-tertiary dark:text-text-tertiary-dark text-xs tablet:text-md'>
        {icon === 'Like' ? '22' : '4'}
      </p>
    </div>
  );
}

export default LikeIcon;
