import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  switchTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localTheme = window.localStorage.getItem('theme') as Theme | null;
      // 로컬스토리지에 저장된 테마가 있으면
      if (localTheme) {
        setTheme(localTheme);
        document.documentElement.dataset.theme = localTheme;
      } else {
        // 없으면 기본 다크로
        setTheme('dark');
        document.documentElement.dataset.theme = 'dark';
      }
    }
  }, []);

  const switchTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('theme', newTheme);
      document.documentElement.dataset.theme = newTheme;
    }
  };

  const value = useMemo(() => ({ theme, switchTheme }), [theme, switchTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('ThemeProvider 안에서 useTheme를 사용해주세요');
  }
  return context;
};
