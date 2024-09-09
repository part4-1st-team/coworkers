import clsx from 'clsx';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

/**
 * 드롭다운 리스트들을 감싸는 메뉴 컴포넌트
 * @param children 드롭다운 내부 요소
 * @param isOpen 드롭다운이 열렸는지 판단하는 boolean 변수
 * @param position (선택) 메뉴 컴포넌트의 위치를 지정하기 위한 prop (ex: 'top-30 l-20')
 * @returns 드롭다운 리스트들을 감싸는 메뉴 컴포넌트 반환
 */
function DropdownMenu({
  children,
  isOpen,
  position = 'top-30 l-0',
}: {
  children: ReactNode;
  isOpen: boolean;
  position?: string;
}) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }} // 시작 상태: 투명하고 위에 위치
      animate={{ opacity: 1, y: 0 }} // 열릴 때: 불투명해지고 원위치로 이동
      transition={{ duration: 0.3 }} // 애니메이션 지속 시간
      exit={{ opacity: 0, y: -20 }}
      className={clsx(
        'absolute z-dropdown bg-background-secondary border border-border-primary border-opacity-10 rounded-12 w-fit p-8 space-y-6',
        position,
      )}
    >
      {children}
    </motion.div>
  );
}

DropdownMenu.defaultProps = {
  position: 'top-30 l-0',
};

export default DropdownMenu;
