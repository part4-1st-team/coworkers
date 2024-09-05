import HistoryList from './HistoryList';

function DailyTaskHistory({ history }: { history: IHistory }) {
  const { date, tasks } = history;
  return (
    <div className='w-full flex flex-col gap-[16px]'>
      <h2 className='text-lg font-medium text-text-primary'>{date}</h2>
      {tasks.map((task) => (
        <HistoryList task={task} />
      ))}
    </div>
  );
}

export default DailyTaskHistory;
