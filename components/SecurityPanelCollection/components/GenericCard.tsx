import React from 'react';

import ClaimScreenImage2 from '../../../assets/images/claim/screen-2.svg';
import Colors from '../../../constants/Colors';
import { MarketingType } from '../../../constants/Marketing';
import { useAuthContext } from '../../../hooks/useAuth';
import useColorScheme from '../../../hooks/useColorScheme';
import { useMarketingContext } from '../../../hooks/useMarketing';
import { RootStackScreenProps } from '../../../navigation/types';
import { PoppinsBold } from '../../StyledText';
import { View, Button, SafeAreaView } from '../../Themed';
import { GenericCardStyles as styles } from './styles';

export default function GenericCard({
  navigation,
}: RootStackScreenProps<'Marketing'>): JSX.Element {
  const { activeMarketingInfo } = useMarketingContext();
  const { setIsOptionalContentSeen } = useAuthContext();
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView>
      <View style={styles.cardContainer}>
        <View style={styles.mainContentContainer}>
          <View style={styles.imageContainer}>
            <ClaimScreenImage2 preserveAspectRatio="xMidYMax" height={234} width={234} />
          </View>
          <View
            style={[
              styles.titleContainer,
              {
                marginTop: 21,
              },
            ]}>
            <PoppinsBold
              style={[
                styles.title,
                {
                  color: Colors[colorScheme].brandLightGreen,
                },
              ]}>
              Great!
            </PoppinsBold>
          </View>
          <View style={styles.titleContainer}>
            <PoppinsBold style={styles.title}>Hang tight as we setup your wallet</PoppinsBold>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            onPress={() =>
              activeMarketingInfo?.type !== MarketingType.NONE
                ? navigation.replace('Marketing', {
                    screen: 'MarketingPagerPanel',
                  })
                : setIsOptionalContentSeen(true)
            }
            size="giant"
            style={styles.button}>
            Next
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
