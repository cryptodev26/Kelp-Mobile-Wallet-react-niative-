import React, { useCallback, useState } from 'react';
import { Pressable } from 'react-native';

import SwapIcon from '../../../assets/images/icons/swap.svg';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { clipDecimal } from '../../../utils/currency';
import KeyPad from '../../KeyPad';
import { PoppinsBold, PoppinsRegular } from '../../StyledText';
import { Button, View } from '../../Themed';
import { AddKelpStyles as styles } from './styles';

function AddKelp({ onComplete }: { onComplete: () => void }): JSX.Element {
  const colorScheme = useColorScheme();

  const [amount, setAmount] = useState('');

  const handleChangeAmount = useCallback(
    (value: any) => {
      setAmount(amount.concat(value));
    },
    [amount]
  );

  const handleBackSpace = useCallback(() => {
    setAmount(amount.slice(0, -1));
  }, [amount]);

  return (
    <View style={styles.container}>
      {/* Heading */}
      <View>
        <PoppinsBold style={[styles.headingText, { color: Colors[colorScheme].brandLightGreen }]}>
          Buy Kelp
        </PoppinsBold>
      </View>

      {/* Value Info */}
      <View style={styles.valueContainer}>
        <View style={styles.valuePrimaryWrapper}>
          <View
            style={{
              flex: 1,
            }}></View>

          <View>
            <PoppinsBold style={styles.valuePrimaryText}>
              ${clipDecimal(Number(amount))[0]}
              {clipDecimal(Number(amount))[1]}
            </PoppinsBold>
          </View>

          <View style={styles.valuePrimaryIconContainer}>
            <Pressable>
              <SwapIcon style={styles.valuePrimaryIcon} />
            </Pressable>
          </View>
        </View>
        <View>
          <PoppinsRegular style={styles.valueSecondaryText}>BNB Balance: $0.00</PoppinsRegular>
        </View>
      </View>

      {/* Additional Interactions */}
      <View style={styles.additionalInteractionContainer}>
        <Pressable>
          <PoppinsBold
            style={[styles.interactionText, { color: Colors[colorScheme].contentSecondary }]}>
            MIN
          </PoppinsBold>
        </Pressable>

        <Pressable>
          <PoppinsBold
            style={[styles.interactionText, { color: Colors[colorScheme].contentSecondary }]}>
            HALF
          </PoppinsBold>
        </Pressable>

        <Pressable>
          <PoppinsBold
            style={[styles.interactionText, { color: Colors[colorScheme].contentSecondary }]}>
            MAX
          </PoppinsBold>
        </Pressable>
      </View>

      {/* Button Container */}
      <View style={styles.buttonContainer}>
        <Button
          onPress={onComplete}
          size="giant"
          style={{
            width: '100%',
          }}>
          Buy
        </Button>
      </View>

      <KeyPad
        style={{
          paddingBottom: 10,
        }}
        onPress={handleChangeAmount}
        onBackSpace={handleBackSpace}
        extraButtonText="00"
      />
    </View>
  );
}

export default AddKelp;
