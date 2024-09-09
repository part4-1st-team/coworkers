import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onClick: () => void;
}

/**
 *
 * @param children 드롭다운 리스트 내부에 들어올 요소
 * @param onCLick 해당 리스트 요소를 눌렀을 때 실행할 클릭함수
 * @returns 드롭다운 리스트 컴포넌트 반환
 */
function DropdownList({ children, onClick }: Props) {
  return (
    <motion.li
      onClick={onClick}
      initial={{ backgroundColor: 'var(--background-secondary)' }}
      whileHover={{
        backgroundColor: 'var(--background-tertiary)', // 원하는 색상으로 변경
        transition: { duration: 0.3 }, // 부드러운 전환을 위해 지속 시간 설정
      }}
      className='cursor-pointer rounded-8 px-14 py-10 list-none text-text-primary text-md font-normal text-center '
    >
      {children}
    </motion.li>
  );
}

export default DropdownList;
