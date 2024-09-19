import useHistory from '@/hooks/useHistory';
import getSortedHistoryByDate from '@/utils/getSortedHistoryByDate';
import DailyTaskHistory from './DailyTaskHistory';

function MyHistory() {
  const { history: historyList, isLoading } = useHistory();

  if (isLoading) return <>임시 로딩중</>;

  const sortedHistory: SortDoneTask[] = historyList
    ? getSortedHistoryByDate(historyList)
    : [];

  if (sortedHistory.length === 0)
    return (
      <main className='main-container h-[100vh]'>
        <div className='h-full'>
          <h2 className='text-xl font-bold mb-[24px] text-text-primary'>
            마이 히스토리
          </h2>
          <p className='w-full h-full flex justify-center items-center text-md font-medium text-text-default'>
            아직 히스토리가 없습니다.
          </p>
        </div>
      </main>
    );

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
