'use client';
import Link from 'next/link'
import { usePathname } from 'next/navigation';


export default function Header() {
  const pathname = usePathname();
  return <header>
    <Link href="/" className={pathname === "/" ? 'selectedLink' : ''}>Home</Link> 
    <div className="pageNameNav"> 
        <Link href="/now" className={pathname === "/now" ? 'selectedLink' : ''}>Now</Link>
        <Link href="/contact" className={pathname === "/contact" ? 'selectedLink' : ''}>Contact</Link>
    </div>
    </header>
}


