
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ar';
type Direction = 'ltr' | 'rtl';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    appTitle: 'AI Tools Hub Arabia',
    home: 'Home',
    submitTool: 'Submit Tool',
    login: 'Login',
    signup: 'Sign Up',
    logout: 'Logout',
    filter: 'Filter',
    categories: 'Categories',
    arabicSupport: 'Arabic Support',
    all: 'All',
    text: 'Text',
    image: 'Image',
    audio: 'Audio',
    video: 'Video',
    searchPlaceholder: 'Search AI tools...',
    toolName: 'Tool Name',
    description: 'Description',
    category: 'Category',
    website: 'Website',
    submit: 'Submit',
    yes: 'Yes',
    no: 'No',
    email: 'Email',
    password: 'Password',
  },
  ar: {
    appTitle: 'مركز أدوات الذكاء الاصطناعي العربية',
    home: 'الرئيسية',
    submitTool: 'إضافة أداة',
    login: 'تسجيل الدخول',
    signup: 'إنشاء حساب',
    logout: 'تسجيل الخروج',
    filter: 'تصفية',
    categories: 'الفئات',
    arabicSupport: 'دعم اللغة العربية',
    all: 'الكل',
    text: 'نص',
    image: 'صورة',
    audio: 'صوت',
    video: 'فيديو',
    searchPlaceholder: 'البحث عن أدوات الذكاء الاصطناعي...',
    toolName: 'اسم الأداة',
    description: 'الوصف',
    category: 'الفئة',
    website: 'الموقع الإلكتروني',
    submit: 'إرسال',
    yes: 'نعم',
    no: 'لا',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
    // Update HTML class for RTL/LTR
    document.documentElement.classList.toggle('rtl', language === 'en');
    document.documentElement.classList.toggle('ltr', language === 'ar');
  };

  // Translation function
  const t = (key: string): string => {
    return (translations[language] as any)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, direction, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
