import { Platform } from 'react-native';


export const Palette = {
  primaryPink: '#FF007F',
  backgroundStart: '#2A0E26',
  backgroundEnd: '#1A0518',
  textWhite: '#FFFFFF',
  textMuted: '#AFAFAF',
  glow: '#FF007F',
};

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

export const FONTS = {
  // Assuming default system fonts for now, unless we install Google Fonts
  bold: 'System',
  medium: 'System',
  regular: 'System',
  mono: Platform.select({ ios: 'Courier', android: 'monospace', default: 'monospace' }),
};
