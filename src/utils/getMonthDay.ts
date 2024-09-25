function getLastDayOfMonth(month: number) {
  const currentYear = new Date().getFullYear();
  // 다음 달의 첫 날을 구함
  const date = new Date(currentYear, month, 0); // month는 0부터 시작하므로 -1
  return date.getDate(); // 마지막 날 반환
}

function getMonthDay(
  dateString: Date | string,
  type?: 'prev' | 'next',
  hasDay: boolean = true,
) {
  let date;

  if (typeof dateString === 'string') {
    date = new Date(dateString);
  } else {
    date = dateString;
  }

  const dayOfWeekNames = ['일', '월', '화', '수', '목', '금', '토'];

  let month = date.getMonth() + 1;
  let day = date.getDate();
  let dayOfWeek = dayOfWeekNames[date.getDay()]; // 요일

  if (type === 'prev') {
    day -= 1;
    dayOfWeek = dayOfWeekNames[date.getDay() - 1];
    if (day === 0) {
      month -= 1;
      day = getLastDayOfMonth(month);
    }
  }
  if (type === 'next') {
    day += 1;
    dayOfWeek = dayOfWeekNames[date.getDay() + 1];
    if (day > getLastDayOfMonth(month)) {
      month += 1;
      day = 1;
    }
  }

  if (hasDay) return `${month}월 ${day}일 (${dayOfWeek})`;
  return `${month}월 ${day}일`;
}

export default getMonthDay;
