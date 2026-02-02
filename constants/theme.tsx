import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Platform } from 'react-native';

const PinkTheme = {
  primary: '#FF007F',
  backgroundStart: '#2A0E26',
  backgroundEnd: '#1A0518',
  textWhite: '#FFFFFF',
  textMuted: '#AFAFAF',
  glow: '#FF007F',
  name: 'pink',
  surface: '#1E0B1A',
  overlay: 'rgba(255, 0, 127, 0.2)',
  glowTransparent: 'rgba(255, 0, 127, 0.3)',

  // Aliases for compatibility/specific usage
  primaryPink: '#FF007F',
};

const BlueTheme = {
  primary: '#00F0FF',
  backgroundStart: '#001020',
  backgroundEnd: '#000510',
  textWhite: '#FFFFFF',
  textMuted: '#AFAFAF',
  glow: '#00F0FF',
  name: 'blue',
  surface: '#001020',
  overlay: 'rgba(0, 240, 255, 0.2)',
  glowTransparent: 'rgba(0, 240, 255, 0.3)',

  primaryPink: '#00F0FF', // Map old name to new color
};

// Default Legacy Export - WARNING: Static values, use useTheme() instead for dynamic switching
export const Palette = {
  primaryPink: PinkTheme.primary,
  backgroundStart: PinkTheme.backgroundStart,
  backgroundEnd: PinkTheme.backgroundEnd,
  textWhite: PinkTheme.textWhite,
  textMuted: PinkTheme.textMuted,
  glow: PinkTheme.glow,
};

export const FONTS = {
  bold: Platform.select({ ios: 'System', android: 'sans-serif-bold', default: 'sans-serif-bold' }),
  medium: Platform.select({ ios: 'System', android: 'sans-serif-medium', default: 'sans-serif-medium' }),
  regular: Platform.select({ ios: 'System', android: 'sans-serif', default: 'sans-serif' }),
  mono: Platform.select({ ios: 'Courier', android: 'monospace', default: 'monospace' }),
};

export type ThemeType = typeof PinkTheme;

const ThemeContext = createContext<{
  theme: ThemeType;
  toggleTheme: () => void;
}>({
  theme: PinkTheme,
  toggleTheme: () => { },
});

export function ThemeProvider({ children }: { children: ReactNode }): React.JSX.Element {
  const [themeName, setThemeName] = useState<'pink' | 'blue'>('pink');

  const toggleTheme = () => {
    setThemeName(prev => prev === 'pink' ? 'blue' : 'pink');
  };

  const theme = themeName === 'pink' ? PinkTheme : BlueTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

export const Colors = {
  light: {
    text: Palette.textWhite,
    background: Palette.backgroundStart,
    tint: Palette.primaryPink,
    icon: Palette.textWhite,
    tabIconDefault: Palette.textMuted,
    tabIconSelected: Palette.primaryPink,
  },
  dark: {
    text: Palette.textWhite,
    background: Palette.backgroundStart,
    tint: Palette.primaryPink,
    icon: Palette.textWhite,
    tabIconDefault: Palette.textMuted,
    tabIconSelected: Palette.primaryPink,
  },
};
