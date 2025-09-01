'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useTheme } from './ThemeContext';

export default function Navbar() {
  const pathname = usePathname();
  const themeContext = useTheme();
  if (!themeContext) {
    throw new Error('ThemeContext is undefined. Make sure NavBar is wrapped in ThemeProvider.');
  }
  const { theme, toggleTheme } = themeContext;
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleHamburgerButton = () => {
    const nav = document.querySelector('.nav-items');
    if (nav) {
      nav.classList.toggle('open');
    }
    setIsMobileNavOpen(!isMobileNavOpen);
  }


  return (
    <header>
      <div className="nav-items">
        <Link
          href="/"
          className={pathname === "/" ? 'selectedLink' : 'navLink'} 
          onNavigate={toggleHamburgerButton}
        >
          Home
        </Link>
        <Link
          href="/projects"
          className={pathname.startsWith('/projects') ? 'selectedLink' : 'navLink'}
          onNavigate={toggleHamburgerButton}
        >
          Projects
        </Link>
        <Link
          href="/now"
          className={pathname === "/now" ? 'selectedLink' : 'navLink'}
          onNavigate={toggleHamburgerButton}
        >
          Now
        </Link>
        <button className='themeToggleButton' onClick={toggleTheme}>
          <Image src={`/${theme === 'dark' ? 'sun' : 'moon'}-svgrepo-com.png`} alt='test' width={24} height={24} />
        </button>
      </div>
      <button className="hamburger" onClick={toggleHamburgerButton}>
        <Image src={!isMobileNavOpen ? 'hamburger-svgrepo-com.png' : 'close-x-svgrepo-com.png'} alt='test' width={24} height={24} />
      </button>
    </header>
  );
}


