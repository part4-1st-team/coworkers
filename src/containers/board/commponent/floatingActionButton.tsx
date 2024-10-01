import Link from 'next/link';
import FloatingButton from '@/components/button/floatingButton';

function FloatingActionButton({ href, text }: { href: string; text: string }) {
  return (
    <Link href={href}>
      <FloatingButton
        type='button'
        icon='plus'
        className='text-lg w-104 h-49 fixed bottom-145 desktop:bottom-45 right-21 tablet:right-25 desktop:right-80'
        text={text}
      />
    </Link>
  );
}

export default FloatingActionButton;
