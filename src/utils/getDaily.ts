function getDaily(daily: string) {
  if (daily === 'DAILY') {
    return '매일 반복';
  }
  if (daily === 'WEEKLY') {
    return '매주 반복';
  }
  if (daily === 'MONTHLY') {
    return '매달 반복';
  }
  if (daily === 'ONCE') {
    return '매일 반복';
  }

  return '기타';
}

export default getDaily;
