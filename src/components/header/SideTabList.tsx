import IconImage from '@/assets/images/img.png';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/router';
import CrownIcon from '../icon/Crown';

interface ListProps {
  group: ResponseGroup;
  onClick: () => void;
  className?: string;
  OWNER?: boolean;
}

/**
 *
 * @param membership (type: Membership)
 * @param onClick (type: ()=>void) 클릭 핸들러 함수
 * @param className (선택)
 * @returns 누르면 해당 그룹 페이지로 이동하는 컴포넌트
 */
function SideTabList({ group, onClick, className, OWNER }: ListProps) {
  const router = useRouter();
  const { id: groupId, name, image } = group;

  return (
    <button
      type='button'
      onClick={() => {
        onClick();
        router.push(`/group/${groupId}`);
      }}
      className={clsx(
        'w-186 h-46 flex items-center justify-between py-7 px-8 hover:bg-background-primary dark:hover:bg-slate-700 rounded-8',
        className,
      )}
    >
      <div className='h-32 flex gap-12 items-center'>
        <div className='w-32 h-32 rounded-6 overflow-hidden'>
          <Image
            src={image ?? IconImage}
            alt='그룹 이미지'
            width={64}
            height={64}
            className='object-cover w-full h-full'
          />
        </div>
        <span className='truncate max-w-110'>{name}</span>
      </div>
      {OWNER && <CrownIcon />}
    </button>
  );
}
export default SideTabList;
