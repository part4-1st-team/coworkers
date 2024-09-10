/* eslint-disable react/require-default-props */
import clsx from 'clsx';
import { IconArrowTOP } from '@/assets/IconList';
import CircleButton from './CircleButton';

type EnterButtonProps = {
  className?: string;
};

function EnterButton({ className }: EnterButtonProps) {
  const buttonClass = clsx(
    'w-24 h-24 border-none bg-icon-primary hover:bg-interaction-hover active:bg-icon-brand',
    className,
  );

  return (
    <CircleButton
      type='button'
      icon={<IconArrowTOP />}
      className={buttonClass} // 병합된 클래스를 CircleButton에 전달
    />
  );
}

export default EnterButton;
