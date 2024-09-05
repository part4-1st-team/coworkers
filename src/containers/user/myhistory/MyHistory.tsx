import DailyTaskHistory from './DailyTaskHistory';

const tasksDone = [
  {
    id: 7947,
    updatedAt: '2024-09-04T16:14:56+09:00',
    date: '2024-09-04T09:00:00+09:00',
    doneAt: '2024-09-04T16:14:56+09:00',
    recurringId: 1896,
    name: 'asd',
    description: 'asdf',
    frequency: 'ONCE',
    deletedAt: null,
    userId: 525,
    writerId: 525,
    displayIndex: 1,
  },
  {
    id: 7948,
    updatedAt: '2024-09-04T16:14:56+09:00',
    date: '2024-09-04T09:00:00+09:00',
    doneAt: '2024-09-04T16:14:56+09:00',
    recurringId: 1897,
    name: 'dsfsdaf',
    description: 'sdfsda',
    frequency: 'ONCE',
    deletedAt: null,
    userId: 525,
    writerId: 525,
    displayIndex: 2,
  },
  {
    id: 7944,
    updatedAt: '2024-09-04T15:59:57+09:00',
    date: '2024-09-04T09:00:00+09:00',
    doneAt: '2024-09-05T15:59:57+09:00',
    recurringId: 1895,
    name: '글쓰기',
    description: '화수에 글쓰기',
    frequency: 'WEEKLY',
    deletedAt: null,
    userId: 525,
    writerId: 525,
    displayIndex: 0,
  },
];

const groupedByDate = tasksDone.reduce((acc, task) => {
  // const formattedDate = task.doneAt.split('T')[0]; // doneAt에서 날짜 부분만 추출
  const dateObj = new Date(task.doneAt);
  const formattedDate = `${dateObj.getFullYear()}년 ${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const existingGroup = acc.find((group: any) => group.date === formattedDate);

  if (existingGroup) {
    existingGroup.tasks.push(task);
  } else {
    acc.push({ date: formattedDate, tasks: [task] });
  }
  return acc;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}, [] as any);

function MyHistory() {
  return (
    <main className='main-container'>
      <div>
        <h2 className='text-xl font-bold mb-[24px] text-text-primary'>
          마이 히스토리
        </h2>
        <div className='space-y-[40px]'>
          {groupedByDate.map((history: IHistory) => (
            <DailyTaskHistory history={history} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default MyHistory;
