import Button from '@/components/button/button';
import Image from 'next/image';

function CalendarButton() {
  return (
    <Button
      type='button'
      rounded
      icon={
        <Image
          src='/svgs/ic_calendar.svg'
          alt='Check Icon'
          width={10}
          height={10}
        />
      }
      className='bg-background-secondary w-6 h-6'
    />
  );
}

export default CalendarButton;

/*
 * `CalendarButton` 컴포넌트는 캘린더 아이콘을 가진 버튼을 렌더링합니다.
 *
 * ## 사용 방법
 *
 * ```tsx
 * <CalendarButton />
 * ```
 *
 * ## 스타일
 *
 * - 버튼의 크기: `w-6 h-6`
 * - 버튼의 배경 색상: `bg-background-secondary`
 * - 아이콘 크기: `width={10} height={10}`
 *
 * ## 아이콘
 *
 * - 아이콘 경로: `/svgs/ic_calendar.svg`
 * - 아이콘 대체 텍스트: `Check Icon`
 */
