import HistoryList from './HistoryList';

function DailyTaskHistory({ history }: { history: SortDoneTask }) {
  const { date, tasks } = history;
  return (
    <div className='w-full flex flex-col gap-16'>
      <h2 className='text-lg font-medium text-text-primary'>{date}</h2>
      {tasks.map((task: DoneTask) => (
        <HistoryList task={task} key={task.id} />
      ))}
    </div>
  );
}

export default DailyTaskHistory;
