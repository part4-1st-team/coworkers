import { ReactElement, ReactNode } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface ExampleCustomInputProps {
  value?: string;
  onClick?: () => void;
}

// ExampleCustomInput 컴포넌트 정의
export function CalendarInput({
  value = 'Select date',
  onClick = () => {},
}: ExampleCustomInputProps) {
  return (
    <button
      type='button'
      className='w-336 h-48 text-left text-text-default bg-background-secondary px-16 py-15 rounded-xl leading-4 hover:ring-interaction-hover focus:ring-1'
      onClick={onClick}
    >
      {value}
    </button>
  );
}

function Calendar({
  trigger,
  pickDate,
  setPickDate,
  format,
}: {
  trigger?: ReactElement;
  pickDate: Date;
  setPickDate: any;
  format?: string;
}) {
  return (
    <DatePicker
      selected={pickDate}
      onChange={(nextDate: Date | null) => setPickDate(nextDate)}
      customInput={trigger}
      dateFormat={format ? 'dd일' : 'yyyy년 MM월 dd일'}
    />
  );
}

export default Calendar;
