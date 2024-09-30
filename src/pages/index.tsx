import { useTheme } from '@/hooks/useThemeContext';

export default function Home() {
  const { switchTheme } = useTheme();
  return (
    <main className='main-container text-text-primary dark:text-text-primary-dark'>
      <p>main page</p>
      <button className='bg-brand-primary' type='button' onClick={switchTheme}>
        테마 전환
      </button>
    </main>
  );
}
