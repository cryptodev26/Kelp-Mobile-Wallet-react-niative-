const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';
const brandLightGreen = '#46D6A2';
const contentSecondary = '#CDCECE';

export default {
  light: {
    contentSecondary,
    brandLightGreen,
    text: '#000',
    background: '#f1f1ef',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    contentSecondary,
    brandLightGreen,
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
} as Record<string, Record<string, any>>;
