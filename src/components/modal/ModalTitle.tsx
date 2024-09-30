import dompurify from 'dompurify';

function ModalTitle({ title }: { title: string }) {
  const sanitizer = dompurify.sanitize;
  const cleanTitle = sanitizer(title);
  return (
    <h2
      className='text-text-primary dark:text-text-primary-dark text-lg font-medium'
      dangerouslySetInnerHTML={{ __html: cleanTitle }}
    />
  );
}

export default ModalTitle;
