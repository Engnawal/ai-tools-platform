
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Category } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
  showArabicOnly: boolean;
  setShowArabicOnly: (show: boolean) => void;
}

const FilterBar = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  showArabicOnly,
  setShowArabicOnly,
}: FilterBarProps) => {
  const { t, language } = useLanguage();

  return (
    <div className="bg-card rounded-lg shadow p-4 mb-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="arabic-mode"
              checked={showArabicOnly}
              onCheckedChange={setShowArabicOnly}
            />
            <Label htmlFor="arabic-mode" className={language === 'ar' ? 'font-amiri' : ''}>
              {t('arabicSupport')}
            </Label>
          </div>
        </div>
        
        <div className="w-full">
          <Tabs defaultValue={selectedCategory} onValueChange={(value) => setSelectedCategory(value as Category)}>
            <TabsList className="w-full justify-start overflow-auto">
              <TabsTrigger value="all">{t('all')}</TabsTrigger>
              <TabsTrigger value="text">{t('text')}</TabsTrigger>
              <TabsTrigger value="image">{t('image')}</TabsTrigger>
              <TabsTrigger value="audio">{t('audio')}</TabsTrigger>
              <TabsTrigger value="video">{t('video')}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
