function getDate(dateString: string) {
  const date = new Date(dateString);

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1);
  const day = String(date.getUTCDate());

  let formattedDate = `${year}년 ${month}월 ${day}일`;

  return formattedDate;
}

export default getDate;
