
import Navbar from './navbar';
import Footer from './footer';
import { ThemeProvider } from './ThemeContext';

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <ThemeProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </ThemeProvider>
  );
}