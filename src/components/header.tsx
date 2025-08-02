import Link from 'next/link'

type HeaderProps = {
  pageTitle: string;
};

export default function Header({ pageTitle }: HeaderProps) {
  return <nav>
    {pageTitle !== "Now" && <Link href="/now">Now</Link>}
    {pageTitle !== "Home" && <Link href="/">Home</Link>}
  </nav>
}