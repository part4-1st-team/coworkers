import getMonthDay from '@/utils/getMonthDay';
import { clsx } from 'clsx';
import { forwardRef, ReactElement, ReactNode } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TooltipWrapper from '../tooltip/TooltipWrapper';

interface ExampleCustomInputProps {
  value?: string;
  onClick?: () => void;
}

// ExampleCustomInput 컴포넌트 정의
export const CalendarInput = forwardRef<
  HTMLButtonElement,
  ExampleCustomInputProps
>(({ value = 'Select date', onClick = () => {} }, ref) => {
  return (
    <TooltipWrapper
      position='right-0 top-[-100%]'
      message='현재 날짜 이전은 선택이 불가능합니다.'
    >
      <button
        type='button'
        className='w-336 h-48 text-left text-text-default dark:text-text-default-dark bg-background-secondary dark:bg-background-secondary-dark px-16 py-15 rounded-xl leading-4 border border-border-primary dark:border-background-tertiary-dark focus:ring-1'
        onClick={onClick}
        ref={ref} // ref를 전달
      >
        {value}
      </button>
    </TooltipWrapper>
  );
});

CalendarInput.displayName = 'CalendarInput';

function Calendar({
  trigger,
  pickDate,
  setPickDate,
  format,
  min = false,
}: {
  trigger?: ReactElement;
  pickDate: Date;
  setPickDate: any;
  format?: string;
  min?: boolean;
}) {
  const today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);

  const getDayClassName = (date: Date) => {
    if (!min) return '';
    return clsx({
      'cursor-default pointer-events-none': date < today, // 오늘 이전 날짜는 비활성화
    });
  };

  return (
    <DatePicker
      selected={pickDate}
      onChange={(nextDate: Date | null) => setPickDate(nextDate)}
      customInput={trigger}
      dateFormat={format ? 'dd일' : 'yyyy년 MM월 dd일'}
      minDate={min ? today : undefined}
      dayClassName={getDayClassName}
    />
  );
}

export default Calendar;
