import { IconCalendar, IconRepeat } from '@/assets/IconList';
import ProfileImage from '@/components/member/ProfileImage';
import getDaily from '@/utils/getDaily';
import getDate from '@/utils/getDate';

function HalfUserInfo({ task }: { task: DateTask }) {
  const { writer, updatedAt, date, frequency } = task;

  const { nickname, image } = writer;

  return (
    <>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-12'>
          <ProfileImage userImage={image} size={32} />

          <span className='text-md font-medium text-text-primary dark:text-text-primary-dark'>
            {nickname}
          </span>
        </div>
        <span className='text-md font-normal text-text-secondary dark:text-text-secondary-dark'>
          {getDate(updatedAt, true)}
        </span>
      </div>
      <div className='flex gap-10 items-center'>
        <div className='flex items-center gap-6'>
          <IconCalendar width={16} height={16} />
          <span className='text-text-default dark:text-text-default-dark text-xs font-normal'>
            {getDate(date)}
          </span>
        </div>
        <div className='w-1 h-8 bg-border-primary dark:bg-border-primary-dark rounded-4' />
        <div className='flex items-center gap-6'>
          <IconRepeat width={16} height={16} />
          <span className='text-text-default dark:text-text-default-dark text-xs font-normal'>
            {getDaily(frequency)}
          </span>
        </div>
      </div>
    </>
  );
}

export default HalfUserInfo;
