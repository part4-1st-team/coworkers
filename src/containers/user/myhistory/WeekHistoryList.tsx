import History from './History';

function WeekHistoryList({ historyGroup }: { historyGroup: SortDoneTask }) {
  return (
    <div className='space-y-15 bg-background-secondary dark:bg-background-secondary-dark p-20 rounded-12 shadow-md'>
      <h3 className='text-2lg text-text-secondary dark:text-text-secondary-dark font-medium'>
        {historyGroup.date}
      </h3>

      <div className='space-y-10'>
        {historyGroup.tasks.map((history) => (
          <History task={history} key={history.id} />
        ))}
      </div>
    </div>
  );
}

export default WeekHistoryList;
