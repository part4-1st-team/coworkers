function getTime(dateString: Date | string) {
  let date;
  if (typeof dateString === 'string') {
    date = new Date(dateString);
  } else {
    date = dateString;
  }

  let hours = date.getHours();
  const minutes = date.getMinutes();

  // 오전/오후 구분
  const period = hours >= 12 ? '오후' : '오전';

  // 12시간제로 변환 (0시는 12시로, 13~23시는 1~11시로 변환)
  hours = hours % 12 || 12;

  // 분이 한 자리일 경우 두 자리로 표시
  const formattedMinutes = minutes.toString().padStart(2, '0');

  return `${period} ${hours}시 ${formattedMinutes}분`;
}

export default getTime;
