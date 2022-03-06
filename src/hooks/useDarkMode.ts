import { useEffect, useState } from 'react';

export default function useDarkMode() {
  const [theme, setTheme]: any = useState(localStorage.getItem('theme'));

  localStorage.setItem('isDarkMode', false as any);

  const colorTheme = theme === 'light' ? 'dark' : 'light';

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(colorTheme);
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return [colorTheme, setTheme];
}
