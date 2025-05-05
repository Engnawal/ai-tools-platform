
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AITool } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

interface ToolCardProps {
  tool: AITool;
}

const ToolCard = ({ tool }: ToolCardProps) => {
  const { t, language } = useLanguage();
  
  return (
    <Card className="tool-card h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className={`text-xl ${language === 'ar' ? 'font-amiri' : ''}`}>{tool.name}</CardTitle>
          <Badge variant={tool.arabicSupport ? "default" : "outline"} className="ml-2">
            {tool.arabicSupport ? t('yes') : t('no')} {t('arabicSupport')}
          </Badge>
        </div>
        <Badge variant="secondary" className="mt-2">
          {t(tool.category)}
        </Badge>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className={`text-muted-foreground ${language === 'ar' ? 'font-amiri' : ''}`}>
          {tool.description}
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" variant="outline">
          <a href={tool.website} target="_blank" rel="noopener noreferrer">
            {t('website')}
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ToolCard;
