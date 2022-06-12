import { StyleSheet } from 'react-native';

export const AddKelpStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingText: {
    fontSize: 28,
    textAlign: 'center',
  },
  valueContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  valuePrimaryWrapper: {
    paddingBottom: 16,
    flexDirection: 'row',
  },
  valuePrimaryText: {
    fontSize: 60,
    textAlign: 'center',
  },
  valuePrimaryIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  valuePrimaryIcon: {
    height: 30,
    width: 30,
  },
  valueSecondaryText: { fontSize: 14, textAlign: 'center' },
  additionalInteractionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 10,
  },
  interactionText: {
    fontSize: 25,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    paddingBottom: 25,
    paddingHorizontal: 25,
  },
});

export const PaymentMethodStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingText: {
    fontSize: 24,
    textAlign: 'center',
  },
  methodContainer: {
    marginTop: 62,
    paddingHorizontal: 25,
    width: '100%',
  },
  cardContainer: {
    width: '100%',
    height: 100,
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  iconContainer: {
    backgroundColor: 'transparent',
    marginRight: 25,
  },
  methodTitleWrapper: {
    alignItems: 'flex-start',
    backgroundColor: 'white',
  },
  methodTitle: {
    fontSize: 25,
  },
  secondaryInfoContainer: {
    flex: 1,
    alignItems: 'flex-end',
    backgroundColor: 'white',
  },
  secondaryInfoWrapper: {
    alignItems: 'flex-end',
    backgroundColor: 'white',
  },
});
