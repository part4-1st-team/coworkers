import clsx from 'clsx';
import dompurify from 'dompurify';

function ModalDescription({ description }: { description: string }) {
  const sanitizer = dompurify.sanitize;
  const cleanDescription = sanitizer(description);
  return (
    <p
      className={'text-text-secondary text-md font-medium mt-[8px]'}
      dangerouslySetInnerHTML={{ __html: cleanDescription }}
    />
  );
}

export default ModalDescription;
