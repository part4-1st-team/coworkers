import Button from '@/components/button/button';
import { IconCalendar } from '@/assets/IconList';

/**
 * `CalendarButton` 컴포넌트는 달력 아이콘을 가진 버튼입니다.
 *
 * 이 버튼은 기본적으로 둥글게 디자인되어 있으며, 아이콘은 `IconCalendar`입니다.
 *
 * @returns {JSX.Element} 렌더링된 달력 버튼 요소
 *
 * @example
 * ```tsx
 * <CalendarButton />
 * ```
 */
function CalendarButton() {
  return (
    <Button
      type='button'
      rounded
      icon={<IconCalendar />}
      className='bg-background-secondary w-6 h-6 hover:bg-interaction-hover active:bg-interaction-pressed'
    />
  );
}

export default CalendarButton;
