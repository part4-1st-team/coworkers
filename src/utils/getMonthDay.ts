function getMonthDay(dateString: Date | string) {
  let date;

  if (typeof dateString === 'string') {
    date = new Date(dateString);
  } else {
    date = dateString;
  }

  const dayOfWeekNames = ['일', '월', '화', '수', '목', '금', '토'];

  const month = String(date.getMonth() + 1);
  const day = String(date.getDate());
  const dayOfWeek = dayOfWeekNames[date.getDay()]; // 요일

  return `${month}월 ${day}일 (${dayOfWeek})`;
}

export default getMonthDay;
