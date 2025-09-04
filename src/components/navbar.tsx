'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTheme } from './ThemeContext';

export default function Navbar() {
  const pathname = usePathname();
  const themeContext = useTheme();
  if (!themeContext) {
    throw new Error('ThemeContext is undefined. Make sure NavBar is wrapped in ThemeProvider.');
  }
  
  const { theme, toggleTheme } = themeContext;
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [themeButtonSize, setThemeButtonSize] = useState(24);

  const toggleHamburgerButton = () => {
    const nav = document.querySelector('.nav-items');
    if (nav) {
      nav.classList.toggle('open');
    }
    setIsMobileNavOpen(!isMobileNavOpen);
  }

  useEffect(() => {
    if (isMobileNavOpen) {
      setThemeButtonSize(40);
    } else {
      setThemeButtonSize(24);
    }
  }, [isMobileNavOpen])


  return (
    <header>
      <div className="nav-items">
        <Link
          href="/"
          className={pathname === "/" ? 'selectedLink' : 'navLink'} 
          onNavigate={isMobileNavOpen ? toggleHamburgerButton : () => {}}
        >
          Home
        </Link>
        <Link
          href="/projects"
          className={pathname.startsWith('/projects') ? 'selectedLink' : 'navLink'}
          onNavigate={isMobileNavOpen ? toggleHamburgerButton : () => {}}
        >
          Projects
        </Link>
        <Link
          href="/now"
          className={pathname === "/now" ? 'selectedLink' : 'navLink'}
          onNavigate={isMobileNavOpen ? toggleHamburgerButton : () => {}}
        >
          Now
        </Link>
        <button className='themeToggleButton' onClick={() => {
          toggleTheme();
          if(isMobileNavOpen) {
            toggleHamburgerButton();
          }
        }}>
          <Image src={`/${theme === 'dark' ? 'sun' : 'moon'}-svgrepo-com.png`} alt='theme-toggle-button' width={themeButtonSize} height={themeButtonSize} />
        </button>
      </div>
      <button className="hamburger" onClick={toggleHamburgerButton}>
        {!isMobileNavOpen ?  <>&#9776;</> : <>&times;</>}
      </button>
    </header>
  );
}


