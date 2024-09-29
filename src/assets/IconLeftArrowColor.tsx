import React from 'react';

const IconLeftArrowColor = ({
  strokeColor = '#64748B',
  width = 16,
  height = 16,
}) => (
  <svg
    width={width}
    height={height}
    viewBox='0 0 16 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M10 4L6 8L10 12'
      stroke={strokeColor} // 동적으로 stroke color 설정
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export default IconLeftArrowColor;
