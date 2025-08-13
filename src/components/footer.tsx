'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return <footer>
      <Link href="https://boxd.it/MfSz" target="_blank" rel='noopener noreferrer'>
        <Image src="/letterboxd-decal-dots-neg-mono-500px.png" alt="logo" width={50} height={50} />
      </Link>
      <Link href="https://github.com/matrev" target="_blank" rel='noopener noreferrer'>
        <Image src="/github-mark-white.png" alt="logo" width={50} height={50} />
      </Link>
    </footer>
}


