'use client';
import Link from 'next/link'
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  return <header>
      <Link href="/" className={pathname === "/" ? 'selectedLink' : 'navLink'}>Home</Link> 
      <div className="pageNameNav"> 
          <Link
            href="/projects"
            className={pathname.startsWith('/projects') ? 'selectedLink' : 'navLink'}
          >Projects</Link>
          <Link href="/now" className={pathname === "/now" ? 'selectedLink' : 'navLink'}>Now</Link>
          <Link href="mailto:me@marktrevino.com" className='navLink'>Contact</Link>
      </div>
    </header>
}


