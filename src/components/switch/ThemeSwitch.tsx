import { useTheme } from '@/hooks/useThemeContext';
import { twMerge } from 'tailwind-merge';

function ThemeSwitch() {
  const { theme, switchTheme } = useTheme();
  return (
    <label
      className={twMerge(
        'switch',
        theme === 'dark' ? 'switch-dark' : 'switch-light',
      )}
    >
      <input
        type='checkbox'
        className='appearance-none peer hidden'
        onClick={switchTheme}
        checked={theme === 'dark'}
      />
      <span className='slider'></span>
    </label>
  );
}

export default ThemeSwitch;
