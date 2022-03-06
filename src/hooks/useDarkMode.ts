import { useEffect, useState } from 'react';

export default function useDarkMode() {
  const [theme, setTheme]: any = useState(localStorage.getItem('theme'));

  const colorTheme = theme === 'light' ? 'dark' : 'light';

  console.log(colorTheme);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(theme);
    root.classList.add(colorTheme);
    localStorage.setItem('theme', 'light');
  }, [theme]);

  return [colorTheme, setTheme];
}
