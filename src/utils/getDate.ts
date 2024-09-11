function getDate(dateString: string, dot?: boolean) {
  const date = new Date(dateString);

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1);
  const day = String(date.getUTCDate());

  if (dot) {
    return `${year}.${month.padStart(2, '0')}.${day.padStart(2, '0')}`;
  }

  return `${year}년 ${month}월 ${day}일`;
}

export default getDate;
