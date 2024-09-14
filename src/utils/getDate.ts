function getDate(dateString: string, dot?: boolean) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate());

  if (dot) {
    return `${year}.${month.padStart(2, '0')}.${day.padStart(2, '0')}`;
  }

  return `${year}년 ${month}월 ${day}일`;
}

export default getDate;
