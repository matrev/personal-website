'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeContext';

export default function Navbar() {
  const pathname = usePathname();
  const themeContext = useTheme();
  if (!themeContext) {
    throw new Error('ThemeContext is undefined. Make sure NavBar is wrapped in ThemeProvider.');
  }
  const { theme, toggleTheme } = themeContext;

  return (
    <header>
      <Link href="/" className={pathname === "/" ? 'selectedLink' : 'navLink'}>Home</Link>
      <div className="pageNameNav">
        <Link
          href="/projects"
          className={pathname.startsWith('/projects') ? 'selectedLink' : 'navLink'}
        >Projects</Link>
        <Link href="/now" className={pathname === "/now" ? 'selectedLink' : 'navLink'}>Now</Link>
        <Link href="mailto:me@marktrevino.com" className='navLink'>Contact</Link>
      </div>
      <button onClick={toggleTheme}>
        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </button>
    </header>
  );
}


