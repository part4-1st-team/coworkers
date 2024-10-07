import Image, { StaticImageData } from 'next/image';

interface TaskSummaryProps {
  title: string;
  count: number;
  imgUrl: StaticImageData;
  altText: string;
}

function ReportSummary({ title, count, imgUrl, altText }: TaskSummaryProps) {
  return (
    <div className='w-full min-w-130 h-76 rounded-12 shadow-md bg-background-tertiary dark:bg-background-tertiary-dark p-16 flex justify-between items-center'>
      <div className='flex flex-col gap-6'>
        <p className='text-xs'>{title}</p>
        <p className='text-2xl text-brand-tertiary font-bold'>{count}개</p>
      </div>
      <div>
        <Image src={imgUrl} alt={altText} width={40} height={40} />
      </div>
    </div>
  );
}

export default ReportSummary;
