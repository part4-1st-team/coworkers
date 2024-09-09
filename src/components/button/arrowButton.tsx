import Button from '@/components/button/button';
import { IconArrowLeft, IconArrowRight } from '@/assets/IconList';

type ArrowButtonProps = {
  direction: 'left' | 'right';
};

function ArrowButton({ direction }: ArrowButtonProps) {
  const isLeft = direction === 'left';

  return (
    <Button
      type='button'
      rounded
      icon={isLeft ? <IconArrowLeft /> : <IconArrowRight />}
      className='w-4 h-4 border-none bg-background-secondary hover:bg-interaction-hover active:bg-interaction-pressed'
    />
  );
}

export default ArrowButton;
