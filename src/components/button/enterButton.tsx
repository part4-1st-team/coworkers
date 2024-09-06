import { useState } from 'react';
import Button from '@/components/button/button';
import Image from 'next/image';

function EnterButton() {
  // 버튼의 활성화 상태를 관리하는 상태 변수
  const [isActive, setIsActive] = useState(false);

  // 클릭 시 버튼의 활성화 상태를 토글하는 핸들러
  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <Button
      type='button'
      color='white'
      rounded
      icon={
        <Image
          src={
            isActive
              ? '/svgs/ic_arrow_btn_top_white.svg'
              : '/svgs/ic_arrow_btn_top_white.svg'
          }
          alt='Enter Icon'
          width={16}
          height={16}
        />
      }
      className={`w-6 h-6 border-none ${isActive ? 'bg-icon-brand' : 'bg-icon-primary'}`}
      onClick={handleClick}
    />
  );
}

export default EnterButton;

/*
 * `EnterButton` 컴포넌트는 클릭 시 활성화 상태를 토글하는 버튼을 렌더링합니다.
 *
 * ## 상태
 *
 * - `isActive`: 버튼의 활성화 상태를 나타내는 상태 변수입니다. 초기값은 `false`입니다.
 *
 * ## 클릭 핸들러
 *
 * - `handleClick`: 버튼을 클릭할 때 `isActive` 상태를 토글하는 함수입니다.
 *
 * ## 사용 방법
 *
 * ```tsx
 * <EnterButton />
 * ```
 *
 * ## 스타일
 *
 * - 버튼 크기: `w-6 h-6`
 * - 버튼의 보더: `border-none`
 * - 버튼 배경 색상:
 *   - 활성화 상태일 때 (`isActive`가 `true`): `bg-icon-brand`
 *   - 비활성화 상태일 때 (`isActive`가 `false`): `bg-icon-primary`
 * - 아이콘:
 *   - 활성화 상태일 때: `/svgs/ic_arrow_btn_top_gray.svg`
 *   - 비활성화 상태일 때: `/svgs/ic_arrow_btn_top_white.svg`
 * - 아이콘 대체 텍스트: `Enter Icon`
 */
