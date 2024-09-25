import Tasks from './Tasks';

function TasksSection() {
  return (
    <section className='flex flex-col py-25 px-30 bg-background-secondary w-full h-full rounded-12'>
      <div className='flex flex-col w-fit mb-10'>
        <p className='text-text-default text-md text-medium'>일정 리스트</p>
        <div className='h-3 bg-background-tertiary w-full rounded-8 my-10' />
      </div>
      <Tasks />
    </section>
  );
}
export default TasksSection;
