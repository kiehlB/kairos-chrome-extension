import { useEffect, useState } from 'react';

export default function useDarkMode() {
  const [theme, setTheme]: any = useState('light');
  const [isDarkMode, setIsDarkMode]: any = useState(false);

  localStorage.setItem('isdark', isDarkMode);

  const isButtonDark =
    isDarkMode === 'false' ? 'true' : 'ture' ? 'false' : 'false';
  const colorTheme = theme === 'dark' ? 'light' : 'light' ? 'dark' : 'dark';
  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(colorTheme);
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return [colorTheme, setTheme, isDarkMode, setIsDarkMode, isButtonDark];
}
