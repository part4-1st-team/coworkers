import ButtonExample from '@/stories/buttonExample';

export default function Home() {
  return (
    <main>
      main page
      <ButtonExample
        size='large'
        onClick={() => console.log('button')}
        variant='primary'
      />
      <ButtonExample
        size='small'
        onClick={() => console.log('button')}
        variant='primary'
      />
    </main>
  );
}
