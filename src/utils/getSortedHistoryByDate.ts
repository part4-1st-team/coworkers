function getSortedHistoryByDate(tasks: DoneTask[]): SortDoneTask[] {
  const groupedHistoryByDate = tasks.reduce((acc, task) => {
    const dateObj = new Date(task.doneAt);
    const formattedDate = `${dateObj.getFullYear()}년 ${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`;

    const existingGroup = acc.find(
      (group: SortDoneTask) => group.date === formattedDate,
    );

    if (existingGroup) {
      existingGroup.tasks.push(task);
    } else {
      acc.push({ date: formattedDate, tasks: [task] });
    }
    return acc;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, [] as SortDoneTask[]);

  return groupedHistoryByDate;
}

export default getSortedHistoryByDate;
