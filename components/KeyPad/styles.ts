import { StyleSheet } from 'react-native';

export const KeyPadStyles = StyleSheet.create({
  keyPadContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: 324,
  },
  keyPadButtonWrapper: { flexDirection: 'row' },
  KeyPadButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 125,
    height: 73,
  },
  text: { fontSize: 30 },
  icon: { height: 30, width: 50 },
});
