import Button from '@/components/button/button';
import Image from 'next/image';

type ArrowButtonProps = {
  direction: 'left' | 'right';
};

function ArrowButton({ direction }: ArrowButtonProps) {
  const isLeft = direction === 'left';

  return (
    <Button
      type='button'
      rounded
      icon={
        <Image
          src={
            isLeft
              ? '/svgs/ic_arrow_btn_left.svg'
              : '/svgs/ic_arrow_btn_right.svg'
          }
          alt='Arrow Icon'
          width={6}
          height={3}
        />
      }
      className='w-4 h-4 border-none bg-background-secondary'
    />
  );
}

export default ArrowButton;

/*
 * `ArrowButton` 컴포넌트는 왼쪽 또는 오른쪽 방향을 나타내는 화살표 버튼을 렌더링합니다.
 *
 * ## 사용 방법
 *
 * ```tsx
 * <ArrowButton direction="left" />
 * <ArrowButton direction="right" />
 * ```
 *
 * ## Props
 *
 * - `direction` (`'left' | 'right'`): 화살표의 방향을 설정합니다. `'left'`는 왼쪽 화살표를, `'right'`는 오른쪽 화살표를 렌더링합니다.
 *
 * ## 예제
 *
 * ```tsx
 * // 왼쪽 방향 화살표 버튼
 * <ArrowButton direction="left" />
 *
 * // 오른쪽 방향 화살표 버튼
 * <ArrowButton direction="right" />
 * ```
 *
 * ## 스타일
 *
 * - 버튼의 크기: `w-4 h-4`
 * - 버튼의 배경 색상: `bg-background-secondary`
 * - 버튼의 테두리: 없음 (`border-none`)
 *
 * ## 아이콘
 *
 * - 왼쪽 방향 화살표 아이콘: `/svgs/ic_arrow_btn_left.svg`
 * - 오른쪽 방향 화살표 아이콘: `/svgs/ic_arrow_btn_right.svg`
 */
