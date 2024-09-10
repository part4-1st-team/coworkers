/* eslint-disable react/require-default-props */
import clsx from 'clsx';
import { IconCalendar } from '@/assets/IconList';
import CircleButton from './CircleButton';

type CalendarButtonProps = {
  className?: string;
};

function CalendarButton({ className }: CalendarButtonProps) {
  const buttonClass = clsx(
    'bg-background-secondary w-24 h-24 hover:bg-interaction-hover focus:bg-interaction-pressed',
    className,
  );

  return (
    <CircleButton
      type='button'
      icon={<IconCalendar />}
      className={buttonClass}
    />
  );
}

export default CalendarButton;
