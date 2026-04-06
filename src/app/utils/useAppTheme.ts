import { useState, useEffect } from 'react';

export const themes = [
  {
    id: 'sarı-siyah',
    name: 'Sarı & Siyah',
    description: 'Varsayılan Baymoto',
    primary: '#FFD600',
    secondary: '#121212',
    accent: '#FFC107',
    emoji: '⚡',
    gradient: 'from-yellow-400 to-yellow-600',
    bgGradient: 'from-gray-50 to-gray-100',
    onlineGradient: 'from-green-400 via-green-500 to-green-600',
  },
  {
    id: 'mavi-lacivert',
    name: 'Gece Mavisi',
    description: 'Profesyonel & Sakin',
    primary: '#2196F3',
    secondary: '#0D1B2A',
    accent: '#42A5F5',
    emoji: '🌊',
    gradient: 'from-blue-500 to-blue-800',
    bgGradient: 'from-blue-50 to-blue-100',
    onlineGradient: 'from-blue-400 via-blue-500 to-blue-600',
  },
  {
    id: 'mor-siyah',
    name: 'Mor Tutku',
    description: 'Güçlü & Özgün',
    primary: '#9C27B0',
    secondary: '#1A0028',
    accent: '#BA68C8',
    emoji: '💜',
    gradient: 'from-purple-500 to-purple-900',
    bgGradient: 'from-purple-50 to-purple-100',
    onlineGradient: 'from-purple-400 via-purple-500 to-purple-600',
  },
  {
    id: 'kırmızı-siyah',
    name: 'Kırmızı Ateş',
    description: 'Hızlı & Enerjik',
    primary: '#F44336',
    secondary: '#1A0000',
    accent: '#EF5350',
    emoji: '🔴',
    gradient: 'from-red-500 to-red-900',
    bgGradient: 'from-red-50 to-red-100',
    onlineGradient: 'from-red-400 via-red-500 to-red-600',
  },
  {
    id: 'yeşil-siyah',
    name: 'Doğa Yeşili',
    description: 'Ferah & Dinamik',
    primary: '#4CAF50',
    secondary: '#0A2010',
    accent: '#66BB6A',
    emoji: '🌿',
    gradient: 'from-green-500 to-green-900',
    bgGradient: 'from-green-50 to-green-100',
    onlineGradient: 'from-emerald-400 via-emerald-500 to-emerald-600',
  },
  {
    id: 'turuncu-koyu',
    name: 'Gün Batımı',
    description: 'Sıcak & Canlı',
    primary: '#FF6D00',
    secondary: '#1A0900',
    accent: '#FF9E40',
    emoji: '🌅',
    gradient: 'from-orange-500 to-orange-900',
    bgGradient: 'from-orange-50 to-orange-100',
    onlineGradient: 'from-orange-400 via-orange-500 to-orange-600',
  },
];

export function getAppTheme() {
  const themeId = localStorage.getItem('appTheme') || 'sarı-siyah';
  return themes.find((t) => t.id === themeId) || themes[0];
}

export function useAppTheme() {
  const [theme, setTheme] = useState(getAppTheme);

  useEffect(() => {
    const handler = () => setTheme(getAppTheme());
    window.addEventListener('storage', handler);
    // Also poll every 500ms for same-tab changes
    const interval = setInterval(() => {
      const newTheme = getAppTheme();
      setTheme((prev) => (prev.id !== newTheme.id ? newTheme : prev));
    }, 500);
    return () => {
      window.removeEventListener('storage', handler);
      clearInterval(interval);
    };
  }, []);

  return theme;
}
