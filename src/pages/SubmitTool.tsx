
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Share } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Tool name must be at least 2 characters",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters",
  }),
  category: z.enum(['text', 'image', 'audio', 'video', 'other']),
  website: z.string().url({
    message: "Please enter a valid URL",
  }),
  arabicSupport: z.boolean().default(false),
});

const SubmitTool = () => {
  const { t, language } = useLanguage();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      category: 'text',
      website: '',
      arabicSupport: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, this would save to Supabase
    console.log(values);
    // Example of how to insert into Supabase:
    // const { data, error } = await supabase.from('tools').insert(values);
    
    // Show success message
    toast({
      title: "Tool submitted",
      description: "Your tool has been submitted successfully!",
    });
    form.reset();
  }
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'AI Tools Hub Arabia',
        text: 'Submit a new AI tool to our directory',
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "The link has been copied to your clipboard",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className={language === 'ar' ? 'font-amiri text-2xl' : 'text-2xl'}>
              {t('submitTool')}
            </CardTitle>
            <CardDescription>
              Submit a new AI tool to our directory
            </CardDescription>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleShare}
            className="ml-auto"
            aria-label="Share"
          >
            <Share className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('toolName')}</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. ArabiChat" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('description')}</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe what this AI tool does and its features" 
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('category')}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="text">{t('text')}</SelectItem>
                        <SelectItem value="image">{t('image')}</SelectItem>
                        <SelectItem value="audio">{t('audio')}</SelectItem>
                        <SelectItem value="video">{t('video')}</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('website')}</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="arabicSupport"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        {t('arabicSupport')}
                      </FormLabel>
                      <FormDescription>
                        Does this tool support Arabic language?
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full">{t('submit')}</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmitTool;
