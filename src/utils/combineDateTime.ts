function combineDateTime(dateString: Date, timeString: string) {
  // 기존 Date 객체 생성
  const date = new Date(dateString);

  // timeString에서 시간과 분을 추출
  const [hours, minutes] = timeString.split(':').map(Number);

  // 기존 Date 객체에 시간과 분을 새롭게 설정
  date.setHours(hours);
  date.setMinutes(minutes);

  // 결과 반환
  return date;
}

export default combineDateTime;
