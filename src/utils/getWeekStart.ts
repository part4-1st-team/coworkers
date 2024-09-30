function getWeekStart(date: Date): Date {
  const currentDay = date.getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일
  const startOfWeek = new Date(date);

  startOfWeek.setDate(date.getDate() - currentDay); // 주의 첫 번째 날 (일요일)
  startOfWeek.setHours(0, 0, 0, 0); // 시간도 0으로 초기화

  return startOfWeek;
}

export default getWeekStart;
