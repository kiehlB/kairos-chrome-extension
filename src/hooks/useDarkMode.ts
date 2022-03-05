import { useEffect, useState } from 'react';

export default function useDarkMode() {
  const [theme, setTheme]: any = useState(localStorage.getItem('theme'));
  const [isDarkMode, setIsDarkMode]: any = useState(
    localStorage.getItem('isDarkMode')
  );

  localStorage.setItem('isDarkMode', isDarkMode);

  const isButtonDark = isDarkMode === 'false' ? 'true' : 'false';
  const colorTheme = theme === 'light' ? 'dark' : 'light';
  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(colorTheme);
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return [colorTheme, setTheme, isDarkMode, setIsDarkMode, isButtonDark];
}
