import { useRouter } from 'next/router';
import Image from 'next/image';
import clsx from 'clsx';
import { IconKebabLarge } from '@/assets/IconList';
import IconImage from '@/assets/images/img.png';
import useDropdown from '@/hooks/useDropdown';

interface ListProps {
  size: 'header' | 'side';
  group: ResponseGroup;
  onClick: () => void;
  className?: string;
}

/**
 *
 * @param size (type : 'header' | 'side')  헤더에서 쓰이는지 사이드메뉴에서 쓰이는지
 * @param group: (type : ResponseGroup) group객체
 * @param onClick (type: ()=>void) 클릭 핸들러 함수
 * @param className (선택)
 * @returns 누르면 해당 그룹 페이지로 이동하는 컴포넌트
 */
function SideTabList({ size, group, onClick, className }: ListProps) {
  const router = useRouter();
  const { id: groupId, name, image } = group;

  const widthClass = clsx({
    'w-186': size === 'header',
    'w-248': size === 'side',
  });

  return (
    <button
      type='button'
      onClick={() => {
        onClick();
        router.push(`/group/${groupId}`);
      }}
      className={clsx(
        'flex items-center justify-between py-7 px-8 hover:bg-slate-700 rounded-8',
        widthClass,
        className,
      )}
    >
      <div className='flex gap-12 items-center'>
        <Image
          src={image ?? IconImage}
          width={32}
          height={32}
          alt='그룹 이미지'
          className='rounded-6'
        />
        <span>{name}</span>
      </div>
      {/* NOTE 얘는 어디에 쓰이려나.. */}
      <IconKebabLarge />
    </button>
  );
}
export default SideTabList;
