import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onClick: () => void;
  onClose: () => void;
}

/**
 *
 * @param children 드롭다운 리스트 내부에 들어올 요소
 * @param onClick 해당 리스트 요소를 눌렀을 때 실행할 클릭함수
 * @param onClose 해당 리스트 요소를 누르고 나서 드롭다운을 닫을 클릭함수
 * @returns 드롭다운 리스트 컴포넌트 반환
 */
function DropdownList({ children, onClick, onClose }: Props) {
  return (
    <motion.li
      onClick={(e: any) => {
        e.stopPropagation();
        onClick();
        onClose();
      }}
      initial={{ backgroundColor: 'var(--background-secondary)' }}
      whileHover={{
        backgroundColor: 'var(--background-tertiary)', // 원하는 색상으로 변경
        transition: { duration: 0.3 }, // 부드러운 전환을 위해 지속 시간 설정
      }}
      className='cursor-pointer rounded-8 px-14 py-10 list-none text-text-primary text-md font-normal text-center whitespace-nowrap'
    >
      {children}
    </motion.li>
  );
}

export default DropdownList;
