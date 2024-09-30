import getWeekStart from './getWeekStart';

function getSortedHistoryByWeek(
  tasks: DoneTask[],
  weekOffset: number,
): SortDoneTask[] {
  const today = new Date();
  const startOfThisWeek = getWeekStart(today);
  const startOfPreviousWeek = new Date(startOfThisWeek);
  startOfPreviousWeek.setDate(startOfThisWeek.getDate() - weekOffset * 7); // i주 전의 시작일

  const weeklyGroupedTasks: SortDoneTask[] = [];

  tasks.forEach((task) => {
    const taskDate = new Date(task.doneAt);

    // task가 속한 주를 구함
    const startOfTaskWeek = getWeekStart(taskDate);
    if (startOfTaskWeek.getTime() === startOfPreviousWeek.getTime()) {
      const formattedDate = `${taskDate.getFullYear()}년 ${taskDate.getMonth() + 1}월 ${taskDate.getDate()}일`;
      const existingGroup = weeklyGroupedTasks.find(
        (group) => group.date === formattedDate,
      );

      if (existingGroup) {
        existingGroup.tasks.push(task);
      } else {
        weeklyGroupedTasks.push({ date: formattedDate, tasks: [task] });
      }
    }
  });

  // 날짜 순으로 정렬
  weeklyGroupedTasks.sort((a, b) => {
    const dateA = new Date(a.date.replace(/년 |월 |일/g, '-'));
    const dateB = new Date(b.date.replace(/년 |월 |일/g, '-'));
    return dateA.getTime() - dateB.getTime();
  });

  return weeklyGroupedTasks;
}

export default getSortedHistoryByWeek;
