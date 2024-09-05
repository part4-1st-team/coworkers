function getDaily(daily: string) {
  if (daily === 'DAILY') {
    return '매일 반복';
  } else if (daily === 'WEEKLY') {
    return '매주 반복';
  } else if (daily === 'MONTHLY') {
    return '매달 반복';
  } else if (daily === 'ONCE') {
    return '매일 반복';
  } else {
    return '기타';
  }
}

export default getDaily;
