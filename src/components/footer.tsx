'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from './ThemeContext';

export default function Footer() {
  const themeContext = useTheme();
  const theme = themeContext?.theme ?? 'dark';
  const letterboxdLogo = theme === 'dark'
    ? '/letterboxd-decal-dots-neg-mono-500px.png'
    : '/letterboxd-decal-dots-pos-mono-500px.png';
  const githubLogo = theme === 'dark'
    ? '/github-mark-white.png'
    : '/github-mark.png';
  return (
    <footer>
      <Link href="https://boxd.it/MfSz" target="_blank" rel='noopener noreferrer'>
        <Image src={letterboxdLogo} alt="Letterboxd Logo" width={50} height={50} />
      </Link>
      <Link href="https://github.com/matrev" target="_blank" rel='noopener noreferrer'>
        <Image src={githubLogo} alt="GitHub Logo" width={50} height={50} />
      </Link>
    </footer>
  );
}


