// import useHistory from '@/hooks/useHistory';
import getSortedHistoryByDate from '@/utils/getSortedHistoryByDate';
import DailyTaskHistory from './DailyTaskHistory';

const tasksDone: DoneTask[] = [
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

function MyHistory() {
  // const { history, isLoading } = useHistory();

  // const sortedHistory: SortDoneTask[] = history
  //   ? groupHistoryByDate(history)
  //   : [];

  const sortedHistory: SortDoneTask[] = getSortedHistoryByDate(tasksDone);

  // if (isLoading) return <>임시 로딩중</>;

  return (
    <main className='main-container'>
      <div>
        <h2 className='text-xl font-bold mb-[24px] text-text-primary'>
          마이 히스토리
        </h2>
        <div className='space-y-[40px]'>
          {sortedHistory.map((history: SortDoneTask) => (
            <DailyTaskHistory history={history} key={history.date} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default MyHistory;
