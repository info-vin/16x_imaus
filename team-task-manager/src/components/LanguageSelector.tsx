import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next'; // Import the i18next singleton
import { GlobeIcon } from './icons/GlobeIcon';

const languages = [
  { code: 'en-US', name: 'English', flag: '🇺🇸' },
  { code: 'zh-TW', name: '繁體中文', flag: '🇹🇼' },
  { code: 'ja-JP', name: '日本語', flag: '🇯🇵' },
  { code: 'ko-KR', name: '한국어', flag: '🇰🇷' },
  { code: 'vi-VN', name: 'Tiếng Việt', flag: '🇻🇳' },
];

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [wrapperRef]);

  const changeLanguage = (lng: string) => {
    // Use the i18next singleton to change the language
    i18next.changeLanguage(lng);
    setIsOpen(false);
  };

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition"
        title="Change language"
      >
        <GlobeIcon className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5 z-30">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {languages.map((lang) => (
              <a
                key={lang.code}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  changeLanguage(lang.code);
                }}
                className={`flex items-center gap-3 px-4 py-2 text-sm ${i18n.language === lang.code ? 'bg-indigo-600 text-white' : 'text-gray-200 hover:bg-gray-600'}`}
                role="menuitem"
              >
                <span className="text-lg">{lang.flag}</span>
                <span>{lang.name}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
