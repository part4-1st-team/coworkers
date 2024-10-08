/* eslint-disable react/require-default-props */
import React from 'react';
import clsx from 'clsx';
import { IconSearch } from '@/assets/IconList';
import Input from './input';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  iconClassName?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * `SearchInput` 컴포넌트는 검색 기능을 위한 입력 필드와 검색 아이콘을 렌더링합니다.
 *
 * @param {SearchInputProps} props - 입력 필드의 속성
 * @returns {JSX.Element} 렌더링된 검색 입력 필드 요소
 *
 * @example
 * ```tsx
 * <SearchInput
 *   id="search"
 *   placeholder="Search..."
 *   className="custom-class"
 *   iconClassName="text-gray-500"
 *   value={searchValue}
 *   onChange={(e) => setSearchValue(e.target.value)}
 * />
 * ```
 */
function SearchInput({
  className,
  iconClassName,
  value,
  onChange,
  ...props
}: SearchInputProps) {
  return (
    <div className='relative w-full '>
      <Input
        value={value}
        onChange={onChange}
        {...props}
        className={clsx('pl-48', className)}
      />
      <span
        className={clsx(
          'absolute left-16 top-1/2 transform -translate-y-1/2 text-icon-primary dark:text-icon-primary-dark ',
          iconClassName,
        )}
      >
        <IconSearch width={24} height={24} />
      </span>
    </div>
  );
}

export default SearchInput;
