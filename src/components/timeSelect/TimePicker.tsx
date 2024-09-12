import useDetectClose from '@/hooks/useDetectClose';
import React, { useState } from 'react';

interface TimeItem {
  id: string;
  time: string;
}

function TimePicker({ setTime }: { setTime: any }) {
  // 오전/오후 선택 상태
  const [isAm, setIsAm] = useState<boolean>(true);
  // 시간 선택 상태
  const [selectedTime, setSelectedTime] = useState<string>('12:00');
  // 드롭다운 활성화 상태
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  // 드롭다운 활성화 시 포커스 상태
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const ref = useDetectClose(() => setIsDropdown(false));

  // 오전 시간 리스트 (12:00 AM ~ 11:30 AM) with IDs
  const amTimes: TimeItem[] = Array.from({ length: 12 * 2 }, (_, i) => {
    const hours = String(Math.floor(i / 2) || 12).padStart(2, '0');
    const minutes = i % 2 === 0 ? '00' : '30';
    const time = `${hours}:${minutes}`;
    return { id: time, time }; // 시간 문자열을 ID로 사용
  });

  // 오후 시간 리스트 (12:00 PM ~ 11:30 PM) with IDs
  const pmTimes: TimeItem[] = amTimes.map((item) => {
    const [hours, minutes] = item.time.split(':');
    const pmHour = (parseInt(hours, 10) % 12) + 12;
    const time = `${pmHour}:${minutes}`;
    return { id: time, time }; // 시간 문자열을 ID로 사용
  });

  // 오전/오후 클릭 핸들러
  function handleAmPmClick(isAmSelected: boolean) {
    setIsAm(isAmSelected);
    setSelectedTime('12:00'); // 오전/오후가 변경될 때 시간 초기화
  }

  // 시간 선택 핸들러
  function handleTimeChange(time: string) {
    setSelectedTime(time);
    setIsDropdown(false); // 시간 선택 후 드롭다운 닫기
    setTime(time);
  }

  // 드롭다운 포커싱 핸들러
  function handleFocus() {
    setIsFocus(isDropdown);
  }

  // 드롭다운 토글 핸들러
  function handleDropdown() {
    setIsDropdown((prev) => !prev);
    handleFocus();
  }

  return (
    <div className='relative z-time-picker' ref={ref}>
      {/* 선택한 시간 표시 */}
      <button
        type='button'
        onClick={handleDropdown}
        className={`w-124 h-48 rounded-12 px-16 py-14 ml-0.5 mb-0.5 bg-background-secondary text-text-default border 
          ${isFocus ? 'border-border-primary' : 'border-interaction-focus'}`} // 동적 border-color
      >
        <p className='text-lg leading-none'>
          {isAm ? '오전' : '오후'} {selectedTime}
        </p>
      </button>

      {isDropdown && (
        <div className='absolute top-56 right-0 flex items-start w-336px h-176px rounded-12px bg-background-secondary p-12px border border-interaction-focus'>
          <div>
            {/* 오전/오후 선택 버튼 */}
            <div className='flex flex-col justify-center mb-4 bg-background-secondary gap-0.5'>
              <button
                type='button'
                className={`rounded-12px w-78px h-40px px-10px py-8px text-text-default 
                ${isAm ? 'bg-interaction-focus text-text-primary' : 'bg-background-primary hover:bg-interaction-hover'}`}
                onClick={() => handleAmPmClick(true)}
              >
                오전
              </button>
              <button
                type='button'
                className={`rounded-12px w-78px h-40px px-10px py-8px text-text-default 
                ${!isAm ? 'bg-interaction-focus text-text-primary' : 'bg-background-primary hover:bg-interaction-hover'}`}
                onClick={() => handleAmPmClick(false)}
              >
                오후
              </button>
            </div>
          </div>

          {/* 시간 선택 */}
          <div className='w-220px h-152px px-16px py-8px text-text-default bg-background-primary ml-14px rounded-tl-12px rounded-bl-12px overflow-y-auto relative'>
            <div className='text-text-default'>
              {(isAm ? amTimes : pmTimes).map((item) => (
                <button
                  type='button'
                  key={item.id} // 고유 ID 사용
                  value={item.time}
                  onClick={() => handleTimeChange(item.time)}
                  className='focus:text-interaction-focus hover:text-interaction-focus py-7.5px rounded w-full h-34px text-left leading-none'
                >
                  {item.time}
                </button>
              ))}
            </div>
          </div>
          <div className='bg-background-primary h-152px w-15 text-background-primary rounded-tr-12px rounded-br-12px'>
            .
          </div>
        </div>
      )}
    </div>
  );
}

export default TimePicker;
