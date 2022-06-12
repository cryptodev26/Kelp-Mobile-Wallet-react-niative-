import React from 'react';
import 'react-native-get-random-values';
import '@ethersproject/shims';
import { ethers } from 'ethers';

import { PhraseSetupStackScreenProps } from '../../../navigation/types';
import EnhancedText from '../../EnhancedText';
import { PoppinsMedium, PoppinsRegular } from '../../StyledText';
import { View, Button, SafeAreaView } from '../../Themed';
import { PhraseShowStyles as styles } from './styles';

export default function PhraseShow({ navigation }: PhraseSetupStackScreenProps<'PhraseShowPanel'>) {
  const randomMnemonic = ethers.Wallet.createRandom().mnemonic;

  const randomPhrase = randomMnemonic.phrase.split(' ');

  return (
    <SafeAreaView>
      <View style={styles.cardContainer}>
        <View style={styles.mainContentContainer}>
          <View style={styles.titleContainer}>
            <EnhancedText style={styles.title}>This is your</EnhancedText>
            <EnhancedText style={styles.title}>{`[Secret Phrase]<brandLightGreen>`}</EnhancedText>
          </View>

          <View style={styles.subtitleContainer}>
            <PoppinsRegular style={styles.subtitle}>
              Write down each word on a piece of paper and remember to follow the rules!
            </PoppinsRegular>
          </View>

          <View style={styles.phraseContainer}>
            <View style={styles.leftPhraseWrapper}>
              {randomPhrase
                .filter((_, idx) => idx < 6)
                .map((word, idx) => (
                  <View
                    key={idx}
                    style={[
                      styles.phrase,
                      {
                        marginTop: idx === 0 ? undefined : 36,
                      },
                    ]}>
                    <PoppinsMedium style={[styles.word, { color: '#CDCECE', marginRight: 25 }]}>
                      {idx + 1}
                    </PoppinsMedium>
                    <PoppinsMedium style={styles.word}>{word}</PoppinsMedium>
                  </View>
                ))}
            </View>
            <View style={styles.rightPhraseWrapper}>
              {randomPhrase
                .filter((_, idx) => idx >= 6)
                .map((word, idx) => (
                  <View
                    key={idx}
                    style={[
                      styles.phrase,
                      {
                        marginTop: idx === 0 ? undefined : 36,
                      },
                    ]}>
                    <PoppinsMedium style={[styles.word, { color: '#CDCECE', marginRight: 25 }]}>
                      {idx + 7}
                    </PoppinsMedium>
                    <PoppinsMedium style={styles.word}>{word}</PoppinsMedium>
                  </View>
                ))}
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() =>
              navigation.replace('PhraseVerifyPanel', {
                phrase: randomPhrase,
              })
            }
            size="giant"
            style={styles.button}>
            NEXT
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
