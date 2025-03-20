
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from 'lucide-react';

// Define available languages
const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
];

const LanguageSwitcher = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  
  const handleLanguageChange = (langCode: string) => {
    setCurrentLanguage(langCode);
    // In a real implementation, this would update the app's language context
    // and trigger content translation throughout the app
    console.log(`Language changed to: ${langCode}`);
  };
  
  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === currentLanguage) || languages[0];
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2 px-3 border-royal-blue/30 bg-royal-blue/5 hover:bg-royal-blue/10"
        >
          <Globe className="h-4 w-4 text-royal-blue" />
          <span className="mr-1">{getCurrentLanguage().flag}</span>
          <span className="hidden sm:inline">{getCurrentLanguage().name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[180px]">
        {languages.map((language) => (
          <DropdownMenuItem 
            key={language.code}
            className={`flex items-center gap-2 cursor-pointer ${
              currentLanguage === language.code ? 'bg-royal-blue/10 text-royal-blue' : ''
            }`}
            onClick={() => handleLanguageChange(language.code)}
          >
            <span className="text-base">{language.flag}</span>
            <span>{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
