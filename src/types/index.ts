
export interface AITool {
  id: string;
  name: string;
  description: string;
  category: 'text' | 'image' | 'audio' | 'video' | 'other';
  arabicSupport: boolean;
  website: string;
  logo?: string;
  created_at: string;
}

export type Category = 'all' | 'text' | 'image' | 'audio' | 'video' | 'other';
