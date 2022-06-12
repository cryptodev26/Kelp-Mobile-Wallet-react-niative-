import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '@ui-kitten/components';
import * as Haptics from 'expo-haptics';
import React, { useCallback, useMemo, useState } from 'react';
import { Pressable } from 'react-native';

import { Onboarding } from '../../../constants/OnboardingStatus';
import { useAuthContext } from '../../../hooks/useAuth';
import {
  AuthStackParamList,
  AuthStackScreenProps,
  SecuritySetupStackParamList,
  SecuritySetupStackScreenProps,
} from '../../../navigation/types';
import KeyPad from '../../KeyPad';
import { PoppinsBold, PoppinsRegular } from '../../StyledText';
import { View, Button, SafeAreaView } from '../../Themed';
import { PinCardStyles as styles } from './styles';

type PinCardProps = {
  nextButtonText?: string;
};

type routeType =
  | SecuritySetupStackScreenProps<'ConfirmPinPanel'>['route']
  | SecuritySetupStackScreenProps<'CreatePinPanel'>['route']
  | AuthStackScreenProps<'VerifyPinPanel'>['route'];

type navigationType = NativeStackNavigationProp<
  AuthStackParamList & SecuritySetupStackParamList,
  keyof AuthStackParamList & keyof SecuritySetupStackParamList
>;

export default function PinCard({
  route,
  navigation,
  nextButtonText = 'Next',
}:
  | {
      route: routeType;
      navigation: navigationType;
    } & PinCardProps): JSX.Element {
  const [pin, setPin] = useState('');
  const { setOnboardingState, setLocalPin, setIsAuthComplete, localPin } = useAuthContext();

  const isPinValid = useMemo(() => {
    return pin.length === 4;
  }, [pin]);

  const handlePinChange = useCallback(
    (buttonValue: any) => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      if (pin.length <= 3) {
        setPin(pin.concat(buttonValue));
      }
    },
    [pin]
  );

  const handleBackSpace = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setPin(pin.slice(0, -1));
  }, [pin]);

  const cardTitle = useMemo(() => {
    switch (route.name) {
      case 'CreatePinPanel':
        return 'Set a Passcode';
      case 'ConfirmPinPanel':
        return 'Confirm Passcode';
      case 'VerifyPinPanel':
        return 'Passcode';
      default:
        return 'Set a Passcode';
    }
  }, []);

  const handleComplete = useCallback(() => {
    switch (route.name) {
      case 'CreatePinPanel':
        navigation.replace('ConfirmPinPanel', {
          pin,
        });
        break;
      case 'ConfirmPinPanel':
        if (route.params?.pin === pin) {
          setLocalPin(pin);
          setIsAuthComplete(true);
          setOnboardingState(Onboarding.COMPLETE);
        }
        break;
      case 'VerifyPinPanel':
        if (pin === localPin) {
          setIsAuthComplete(true);
        }
        break;
      default:
        break;
    }
  }, [pin]);

  const keypad = useMemo(() => {}, [handlePinChange]);

  return (
    <SafeAreaView>
      <View style={styles.cardContainer}>
        <View style={styles.iconContainer}>
          <Pressable onPress={() => {}}>
            <View style={styles.iconWrapper}>
              <Icon name="arrow-back-outline" fill="#3f3f3f" />
            </View>
          </Pressable>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <PoppinsBold style={styles.title}>{cardTitle}</PoppinsBold>
          </View>
          <View style={styles.inputContainer}>
            {[0, 1, 2, 3].map((index) => (
              <View
                key={index}
                style={[
                  styles.textWrapper,
                  pin[index] !== undefined
                    ? {
                        borderBottomColor: '#47d6a2',
                      }
                    : {
                        borderBottomColor: '#CDCECE',
                      },
                ]}>
                <PoppinsRegular style={styles.input}>{pin[index]}</PoppinsRegular>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            size="giant"
            disabled={!isPinValid}
            onPress={handleComplete}
            style={styles.button}>
            {nextButtonText}
          </Button>
        </View>
        <KeyPad
          onPress={handlePinChange}
          onBackSpace={handleBackSpace}
          style={{
            paddingBottom: 34,
          }}
        />
      </View>
    </SafeAreaView>
  );
}
