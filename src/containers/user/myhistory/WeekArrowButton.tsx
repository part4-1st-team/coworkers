import { IconArrowTOP } from '@/assets/IconList';
import clsx from 'clsx';

function WeekArrowButton({
  direction,
  onClick,
  offset,
  disabled,
}: {
  direction: 'up' | 'down';
  offset: number;
  onClick: () => void;
  disabled?: boolean;
}) {
  const nextWeekText =
    offset <= 0 || offset - 1 === 0
      ? '이번 주 보기'
      : `${offset - 1}주 전 보기`;

  const text = direction === 'up' ? `${offset + 1}주 전 보기` : nextWeekText;

  return (
    <button
      className='text-md text-text-default dark:text-text-default-dark font-medium flex gap-10 items-center'
      onClick={onClick}
      disabled={disabled}
    >
      <div
        className={clsx(
          'size-24 flex items-center justify-center bg-brand-primary rounded-full',
          disabled ? 'bg-text-default' : '',
        )}
      >
        <IconArrowTOP className={clsx(direction === 'down' && 'rotate-180')} />
      </div>
      {text}
    </button>
  );
}

export default WeekArrowButton;
