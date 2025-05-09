import { useEffect, useState } from 'react';
import { FaDesktop, FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
  const getInitialTheme = () => {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return 'system'; // mặc định
  };

  const [theme, setTheme] = useState(getInitialTheme());

  useEffect(() => {
    const root = window.document.documentElement;
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const applyTheme = (mode) => {
      if (mode === 'dark' || (mode === 'system' && isSystemDark)) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    applyTheme(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const isActive = (mode) =>
    theme === mode
      ? 'bg-[#2A3A5B] text-white'
      : 'text-gray-400 hover:text-white';

  return (
    <div className="flex space-x-2 ">
      <button
        aria-label="System theme"
        onClick={() => setTheme('system')}
        className={`flex items-center justify-center w-8 h-8 rounded-full ${isActive('system')}`}
      >
        <FaDesktop />
      </button>

      <button
        aria-label="Light mode"
        onClick={() => setTheme('light')}
        className={`flex items-center justify-center w-8 h-8 rounded-full ${isActive('light')}`}
      >
        <FaSun />
      </button>

      <button
        aria-label="Dark mode"
        onClick={() => setTheme('dark')}
        className={`flex items-center justify-center w-8 h-8 rounded-full ${isActive('dark')}`}
      >
        <FaMoon />
      </button>
    </div>
  );
}
