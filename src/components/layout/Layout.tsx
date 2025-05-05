
import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLanguage } from '@/contexts/LanguageContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { direction } = useLanguage();

  return (
    <div className={direction}>
      <Navbar />
      <main className="min-h-[calc(100vh-180px)]">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
