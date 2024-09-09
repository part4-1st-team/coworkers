import { useState } from 'react';

/**
 * 드롭다운 훅
 * @returns isOpen 드롭다운이 열렸는지 판단하는 변수
 * @returns currentValue 드롭다운에서 선택한 value
 * @returns setCurrentValue 선택한 value를 바꾸는 함수
 * @returns handleToggleDropdown 드롭다운을 열고 닫는 토글 함수
 * @returns handleOffDropdown 드롭다운을 닫는 함수
 */
function useDropdown() {
  const [currentValue, setCurrentValue] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggleDropdown = () => {
    setIsOpen((prev) => !prev);
    console.log(isOpen);
  };

  const handleOffDropdown = () => {
    setIsOpen(false);
  };

  const handleSetValue = (value: string) => {
    setCurrentValue(value);
  };

  return {
    isOpen,
    handleToggleDropdown,
    handleOffDropdown,
    handleSetValue,
    currentValue,
  };
}

export default useDropdown;
