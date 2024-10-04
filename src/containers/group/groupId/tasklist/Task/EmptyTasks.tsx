function EmptyTasks({ message }: { message: string }) {
  return (
    <section className='whitespace-pre-wrap text-center flex flex-col w-full h-full rounded-12 items-center justify-center text-md font-medium text-text-default'>
      {message}
    </section>
  );
}

export default EmptyTasks;
