
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t mt-10 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className={`text-lg font-semibold ${language === 'ar' ? 'font-amiri' : ''}`}>
            {t('appTitle')}
          </div>
          <div className="mt-4 md:mt-0 text-sm text-gray-500">
            © {currentYear} AI Tools Hub Arabia. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
