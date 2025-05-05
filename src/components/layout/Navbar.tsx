
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Toggle } from '@/components/ui/toggle';

const Navbar = () => {
  const { t, language, toggleLanguage } = useLanguage();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-primary-blue">
            <span className={language === 'ar' ? 'font-amiri' : ''}>
              {t('appTitle')}
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Toggle 
            pressed={language === 'ar'}
            onPressedChange={toggleLanguage}
            className="p-2"
            aria-label="Toggle language"
          >
            {language === 'en' ? 'عربي' : 'English'}
          </Toggle>
          
          <nav className="hidden md:flex items-center space-x-4 ml-4">
            <Link to="/" className="hover:text-primary-blue transition-colors">
              {t('home')}
            </Link>
            <Link to="/submit" className="hover:text-primary-blue transition-colors">
              {t('submitTool')}
            </Link>
            <Link to="/login">
              <Button variant="outline">{t('login')}</Button>
            </Link>
            <Link to="/signup">
              <Button>{t('signup')}</Button>
            </Link>
          </nav>

          {/* Mobile menu button - can be expanded later */}
          <Button variant="ghost" className="md:hidden">
            ☰
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
