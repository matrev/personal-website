'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from './ThemeContext';

export default function Footer() {
  const themeContext = useTheme();
  const theme = themeContext?.theme ?? 'dark';

  return (
    <footer>
      <Link href="https://boxd.it/MfSz" target="_blank" rel='noopener noreferrer'>
        <Image src={`${theme}-letterboxd.png`} alt="Letterboxd Logo" width={50} height={50} />
      </Link>
      <Link href="mailto:me@marktrevino.com" target="_blank" rel='noopener noreferrer'>
        <Image src={`${theme}-mail-svgrepo-com.png`} alt="E-Mail logo" width={60} height={60} />
      </Link>
      <Link href="https://github.com/matrev" target="_blank" rel='noopener noreferrer'>
        <Image src={`${theme}-github.png`} alt="GitHub Logo" width={50} height={50} />
      </Link>
    </footer>
  );
}


