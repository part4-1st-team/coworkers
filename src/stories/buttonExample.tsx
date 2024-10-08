import clsx from 'clsx';

export type Props = {
  variant: 'primary' | 'secondary';
  size: 'large' | 'small';
};

function ButtonExample({ variant, size }: Props) {
  const btnClassNames = clsx('rounded-lg flex items-center justify-center', {
    'bg-brand-primary': variant === 'primary',
    'bg-brand-secondary': variant === 'secondary',
    'px-16 py-8 text-2xl': size === 'large',
    'px-8 py-6 text-md': size === 'small',
  });

  return (
    <button type='button' className={btnClassNames}>
      버튼 예시입니다
    </button>
  );
}

export default ButtonExample;
