function getSortedHistoryByDate(tasks: DoneTask[]): SortDoneTask[] {
  const groupedHistoryByDate = tasks.reduce((acc, task) => {
    const dateObj = new Date(task.doneAt);
    const formattedDate = `${dateObj.getFullYear()}년 ${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const existingGroup = acc.find(
      (group: any) => group.date === formattedDate,
    );

    if (existingGroup) {
      existingGroup.tasks.push(task);
    } else {
      acc.push({ date: formattedDate, tasks: [task] });
    }
    return acc;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, [] as any);

  return groupedHistoryByDate;
}

export default getSortedHistoryByDate;
