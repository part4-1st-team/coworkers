import { useTheme } from '@/hooks/useThemeContext';
import { twMerge } from 'tailwind-merge';

function ThemeSwitch() {
  const { theme, switchTheme } = useTheme();
  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label
        htmlFor='switch'
        className={twMerge(
          'switch',
          theme === 'dark' ? 'switch-dark' : 'switch-light',
        )}
      >
        <input
          id='switch'
          type='checkbox'
          className='appearance-none peer hidden'
          onClick={switchTheme}
          checked={theme === 'dark'}
        />
        <span className='slider' />
      </label>
    </>
  );
}

export default ThemeSwitch;
