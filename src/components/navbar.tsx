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
  const [toggleMobileNav, setToggleMobileNav] = useState(false);

  const toggleHamburgerButton = () => {
    const nav = document.querySelector('.nav-items');
    if (nav) {
      nav.classList.toggle('open');
    }
  }

  return (
    <header>
      <div className="nav-items">
        <Link href="/" className={pathname === "/" ? 'selectedLink' : 'navLink'}>Home</Link>
          <Link
            href="/projects"
            className={pathname.startsWith('/projects') ? 'selectedLink' : 'navLink'}
          >Projects</Link>
          <Link href="/now" className={pathname === "/now" ? 'selectedLink' : 'navLink'}>Now</Link>
          <button className='themeToggleButton' onClick={toggleTheme}>
            <Image src={`/${theme === 'dark' ? 'sun' : 'moon'}-svgrepo-com.png`} alt='test' width={24} height={24}/>
          </button>
      </div>
      <button className="hamburger" onClick={toggleHamburgerButton}>
        hamburger icon
      </button>
    </header>
  );
}


