import { Platform } from 'react-native';

// Do not bundle Apple's font files. iOS's System font resolves to the device's
// current San Francisco family while Android uses the platform sans-serif family.
export const fonts = {
  display: Platform.select({ ios: 'System', default: 'sans-serif' }) ?? 'sans-serif',
  text: Platform.select({ ios: 'System', default: 'sans-serif' }) ?? 'sans-serif',
  mono: Platform.select({ ios: 'Menlo', default: 'monospace' }) ?? 'monospace',
};

export const type = {
  hero: { fontSize: 39, lineHeight: 44, letterSpacing: -1.4, fontWeight: '700' as const },
  title: { fontSize: 28, lineHeight: 34, letterSpacing: -0.8, fontWeight: '700' as const },
  headline: { fontSize: 21, lineHeight: 27, letterSpacing: -0.3, fontWeight: '700' as const },
  body: { fontSize: 16, lineHeight: 23, fontWeight: '500' as const },
  bodySmall: { fontSize: 14, lineHeight: 20, fontWeight: '500' as const },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: '600' as const, letterSpacing: 0.1 },
  amount: { fontSize: 42, lineHeight: 48, fontWeight: '700' as const, letterSpacing: -1.6 },
};
