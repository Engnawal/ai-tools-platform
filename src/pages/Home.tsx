
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import FilterBar from '@/components/tools/FilterBar';
import ToolCard from '@/components/tools/ToolCard';
import { AITool, Category } from '@/types';

// Mock data - in a real app this would come from Supabase
const mockTools: AITool[] = [
  {
    id: '1',
    name: 'ArabiGPT',
    description: 'A GPT model fine-tuned for Arabic language understanding and generation',
    category: 'text',
    arabicSupport: true,
    website: 'https://example.com/arabigpt',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Arabic Speech Recognizer',
    description: 'Advanced speech recognition optimized for Arabic dialects',
    category: 'audio',
    arabicSupport: true,
    website: 'https://example.com/speech',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Neural Translator',
    description: 'State-of-the-art English-Arabic neural translation system',
    category: 'text',
    arabicSupport: true,
    website: 'https://example.com/translator',
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Image Generator Pro',
    description: 'AI image generation with limited Arabic text support',
    category: 'image',
    arabicSupport: false,
    website: 'https://example.com/image-gen',
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Video Summarizer',
    description: 'Automatically create summaries from video content',
    category: 'video',
    arabicSupport: false,
    website: 'https://example.com/video-sum',
    created_at: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Arabic Sentiment Analysis',
    description: 'Analyze sentiment in Arabic text with high accuracy',
    category: 'text',
    arabicSupport: true,
    website: 'https://example.com/sentiment',
    created_at: new Date().toISOString(),
  },
];

const Home = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [showArabicOnly, setShowArabicOnly] = useState(false);
  const [filteredTools, setFilteredTools] = useState<AITool[]>(mockTools);

  // Filter tools based on search query, category and Arabic support
  useEffect(() => {
    let results = mockTools;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        tool => 
          tool.name.toLowerCase().includes(query) || 
          tool.description.toLowerCase().includes(query)
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      results = results.filter(tool => tool.category === selectedCategory);
    }
    
    // Filter by Arabic support
    if (showArabicOnly) {
      results = results.filter(tool => tool.arabicSupport);
    }
    
    setFilteredTools(results);
  }, [searchQuery, selectedCategory, showArabicOnly]);

  return (
    <div className="container mx-auto px-4 py-8">
      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        showArabicOnly={showArabicOnly}
        setShowArabicOnly={setShowArabicOnly}
      />
      
      {filteredTools.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">No tools match your criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
