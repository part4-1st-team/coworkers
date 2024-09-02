import clsx from 'clsx';
import dompurify from 'dompurify';

function ModalDescription({
  description,
  className,
}: {
  description: string;
  className?: string;
}) {
  const sanitizer = dompurify.sanitize;
  const cleanDescription = sanitizer(description);
  return (
    <p
      className={clsx(
        'text-text-secondary text-md font-medium mt-[8px]',
        className,
      )}
      dangerouslySetInnerHTML={{ __html: cleanDescription }}
    />
  );
}

export default ModalDescription;
