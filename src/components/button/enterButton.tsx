/* eslint-disable react/require-default-props */
import clsx from 'clsx';
import { IconArrowTOP } from '@/assets/IconList';
import CircleButton from './CircleButton';

type EnterButtonProps = {
  className?: string;
  disabled?: boolean;
  onClick?: () => void; // onClick 프로퍼티 추가
};

function EnterButton({ className, disabled, onClick }: EnterButtonProps) {
  const buttonClass = clsx(
    'w-24 h-24 border-none bg-icon-primary hover:bg-interaction-hover active:bg-icon-brand',
    className,
  );

  return (
    <CircleButton
      type='submit'
      icon={<IconArrowTOP />}
      className={buttonClass}
      disabled={disabled}
      onClick={onClick} // onClick 전달
    />
  );
}

export default EnterButton;
