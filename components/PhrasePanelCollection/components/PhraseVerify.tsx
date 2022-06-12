import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { random } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { useWalletContext } from '../../../hooks/useWallet';
import { PhraseSetupStackScreenProps, RootStackParamList } from '../../../navigation/types';
import { shuffleArray } from '../../../utils/shuffle';
import EnhancedText from '../../EnhancedText';
import { PoppinsBold, PoppinsRegular } from '../../StyledText';
import { View, Button, SafeAreaView } from '../../Themed';
import { PhraseVerifyStyles as styles } from './styles';

type routeType = PhraseSetupStackScreenProps<'PhraseVerifyPanel'>['route'];

type navigationType = NativeStackNavigationProp<RootStackParamList, keyof RootStackParamList>;

export default function PhraseVerify({
  navigation,
  route,
}: {
  navigation: navigationType;
  route: routeType;
}) {
  const colorScheme = useColorScheme();
  const { generateWalletFromPhrase } = useWalletContext();
  const [currentIdx, setCurrentIdx] = useState(0);

  const randomPhrase = route.params.phrase;

  const randomWordBag = randomPhrase

  const verifyWord = useCallback(
    (word) => {
      if (randomPhrase[currentIdx] === word) {
        setCurrentIdx((prevIdx) => prevIdx + 1);
      } else {
        Alert.alert(
          'Hey There!',
          'please check your paper again and fix that',
          [
            {text: 'Yes', onPress: () => console.log('Yes button clicked')},
            {text: 'No', onPress: () => console.log('No button clicked'), style: 'cancel'},
          ],
          { 
            cancelable: true 
          }
        );
      }
    },
    [currentIdx]
  );

  useEffect(() => {
    if (currentIdx >= randomPhrase.length) {
      generateWalletFromPhrase(randomPhrase.join(' '));
      navigation.replace('SecuritySetup', { screen: 'CreatePinPanel' });
    }
  }, [currentIdx, randomPhrase]);
  
  let firstid;
  let secondid;

  do{
    firstid = Math.floor(Math.random() * randomWordBag.length)
  }
  while (firstid == currentIdx)

  do {
    secondid = Math.floor(Math.random() * randomWordBag.length)
  }
  while (secondid == firstid || secondid == currentIdx)


  const wordArray = shuffleArray(
    currentIdx != 12?
    [
    randomPhrase[currentIdx],
    randomWordBag[firstid],
    randomWordBag[secondid],
    ]:['','','']);


  return (
    <SafeAreaView>
      <View style={[styles.cardContainer, { justifyContent: 'center' }]}>
        <View style={styles.mainContentContainer}>
          <View style={styles.titleContainer}>
            <EnhancedText style={styles.title}>Verify your</EnhancedText>
            <EnhancedText style={styles.title}>{`[Secret Phrase]<brandLightGreen>`}</EnhancedText>
          </View>

          <View style={styles.subtitleContainer}>
            <PoppinsRegular style={styles.subtitle}>
              Match the order of your Secret Phrase by selecting the correct words.
            </PoppinsRegular>
          </View>

          <View style={styles.phraseContainer}>
            {[0, 3, 6, 9].map((value) => (
              <View key={value} style={styles.phraseWrapper}>
                {randomPhrase
                  .filter((_, idx) => value + idx >= value && value + idx < value + 3)
                  .map((word, idx) => (
                    <View
                      key={word}
                      style={[
                        styles.phrase,
                        {
                          backgroundColor:
                            currentIdx > value + idx
                              ? Colors[colorScheme].brandLightGreen
                              : '#CDCECE',
                        },
                      ]}>
                      <PoppinsBold style={styles.phraseIndex}>{value + idx + 1}</PoppinsBold>
                    </View>
                  ))}
              </View>
            ))}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          {wordArray.map((word, idx) => (
            <Button
              key={idx}
              onPress={() => verifyWord(word)}
              size="giant"
              style={[
                styles.button,
                {
                  marginTop: idx === 0 ? undefined : 15,
                },
              ]}>
              {wordArray[idx]}
            </Button>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
