import spinner from '@/assets/spinner.gif';
import Image from 'next/image';

function Spinner({
  size = 100,
  className,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <Image
      src={spinner}
      alt='로딩 스피너'
      width={size}
      height={size}
      className={className}
    />
  );
}

export default Spinner;
