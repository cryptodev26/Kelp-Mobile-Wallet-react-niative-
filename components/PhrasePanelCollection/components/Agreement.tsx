import React, { useCallback, useState } from 'react';

import { PhraseSetupStackScreenProps } from '../../../navigation/types';
import CheckBox from '../../CheckBox';
import EnhancedText from '../../EnhancedText';
import { PoppinsRegular } from '../../StyledText';
import { View, Button, SafeAreaView } from '../../Themed';
import { AgreementStyles as styles } from './styles';

export default function Agreement({
  navigation,
}: PhraseSetupStackScreenProps<'PhraseAgreementPanel'>) {
  const [agreementValues, setAgreementValues] = useState([
    { id: '1', title: 'Write the words down on paper.', isActive: false },
    { id: '2', title: 'You have to strickly follow the sequence.', isActive: false },
    { id: '3', title: 'Check the spelling of each word.', isActive: false },
    { id: '4', title: 'Keep the piece of paper in a safe place.', isActive: false },
    {
      id: '5',
      title: 'Under no circumstances take a screenshot or photo and do not scan it.',
      isActive: false,
    },
    {
      id: '6',
      title: 'Never upload your Recovery Secret Phrase anywhere to the cloud.',
      isActive: false,
    },
  ]);

  const toggleCheckBox = useCallback(
    (idx) => {
      agreementValues[idx].isActive = !agreementValues[idx].isActive;
      setAgreementValues([...agreementValues]);
    },
    [agreementValues]
  );

  return (
    <SafeAreaView>
      <View style={styles.cardContainer}>
        <View style={styles.mainContentContainer}>
          <View style={styles.titleContainer}>
            <EnhancedText
              style={
                styles.title
              }>{`Make sure you follow these [rules]<brandLightGreen>`}</EnhancedText>
          </View>

          <View style={styles.subtitleContainer}>
            <PoppinsRegular style={styles.subtitle}>
              Your secret phrase has been generated!
            </PoppinsRegular>
          </View>

          <View style={styles.agreementContainer}>
            {agreementValues.map((item, idx) => (
              <View
                style={[
                  styles.agreementWrapper,
                  {
                    marginTop: idx === 0 ? undefined : 15,
                  },
                ]}
                key={item.id}>
                <CheckBox
                  onPress={() => toggleCheckBox(idx)}
                  label={item.title}
                  isActive={item.isActive}
                />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            disabled={
              !agreementValues
                .map((item) => item.isActive)
                .reduce((acc, isActive) => isActive && acc, true)
            }
            onPress={() => navigation.replace('PhraseShowPanel')}
            size="giant"
            style={styles.button}>
            I UNDERSTAND
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
