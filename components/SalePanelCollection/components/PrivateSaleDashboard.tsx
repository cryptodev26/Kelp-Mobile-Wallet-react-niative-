import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import BNBIcon from '../../../assets/images/icons/bnb.svg';
import KelpIcon from '../../../assets/images/icons/kelp.svg';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { useMarketingContext } from '../../../hooks/useMarketing';
import { useWalletContext } from '../../../hooks/useWallet';
import { RootStackScreenProps } from '../../../navigation/types';
import { clipDecimal } from '../../../utils/currency';
import CountdownTimer from '../../CountdownTimer';
import { PoppinsBold, PoppinsRegular } from '../../StyledText';
import { Button, SafeAreaView, View } from '../../Themed';
import { PrivateSaleDashboardStyles as styles } from './styles';
import 'react-native-get-random-values';
import '@ethersproject/shims';
import { ethers } from 'ethers';

let provider = new ethers.providers.JsonRpcProvider("https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");


export default function  PrivateSaleDashboard({
  navigation,
}: RootStackScreenProps<'SaleDashboard'>): JSX.Element {
  const colorScheme = useColorScheme();
  const { activeMarketingInfo } = useMarketingContext();
  const { address, publicKey, phrase } = useWalletContext();
  let bnb;
  let tokenAmount

// calaulate bnb balance
try {
    if(address) {
        provider.getBalance(address + '') .then(
        async (res) => {
            bnb = ethers.utils.formatEther( res );
            console.log("BNB balance is", bnb)
            setBnbBalance(bnb);
            console.log(address)
        })
    }
} catch (error) {
  console.log(error)
}

const wallet = ethers.Wallet.fromMnemonic(phrase);
//calculate token balance
console.log(wallet)
try{
  if(wallet){
        let contractAddress = "0xaF9364b57c4fb9086a5Ddcf83dA5FbBD0f5e4D1f"
        let tokenContract = new ethers.Contract(
          contractAddress,
          [{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}],
          provider
        )

        tokenAmount = tokenContract.balanceOf(address).then(
          async(result) => {
            tokenAmount = ethers.utils.formatEther(result);
            tokenAmount = tokenAmount * 1000000000000000000
            setKelpBalance(tokenAmount)
          }
        );
        
    }
  
}catch(err){

}


  const [amountRaised, setAmountRaised] = useState(1412456.57);
  const [kelpBalance, setKelpBalance] = useState(0.00);
  const [kelpValue, setKelpValue] = useState(0.00);
  const [bnbValue, setBnbValue] = useState(830.23);
  const [bnbBalance, setBnbBalance] = useState(0.00);


  return (
    <SafeAreaView>
      <View style={styles.cardContainer}>
        <View style={styles.contentContainer}>
          {/* Heading */}
          <View style={styles.headingContainer}>
            <PoppinsBold
              style={[styles.headingMainText, { color: Colors[colorScheme].brandLightGreen }]}>
             Private sale
            </PoppinsBold>
            <PoppinsRegular
              style={[
                styles.headingSecondaryText,
                { color: Colors[colorScheme].contentSecondary },
              ]}>
              Connect
            </PoppinsRegular>
          </View>
          {/* Countdown */}
          {activeMarketingInfo?.date && (
            <CountdownTimer
              date={activeMarketingInfo.date}
              onTimerComplete={() => navigation.replace('Root')}
            />
          )}
          {/* Amount Raised */}
          <View style={styles.progressBarContainer}>
            <View style={styles.softCapContainer}>
              <PoppinsBold
                style={[styles.progressBarText, { color: Colors[colorScheme].contentSecondary }]}>
                $250 SOFT CAP
              </PoppinsBold>
            </View>
            <AnimatedCircularProgress
              style={{
                height: Dimensions.get('window').width / 2,
              }}
              fill={(amountRaised / 2000000) * 100}
              size={Dimensions.get('window').width - 50}
              width={16}
              backgroundWidth={8}
              arcSweepAngle={180}
              rotation={270}
              fillLineCap="round"
              lineCap="round"
              duration={2500}
              tintColor={Colors[colorScheme].brandLightGreen}
              backgroundColor={Colors[colorScheme].contentSecondary}>
              {() => (
                <View style={styles.progressBarTextWrapper}>
                  <PoppinsBold
                    style={[
                      styles.progressBarText,
                      { color: Colors[colorScheme].contentSecondary },
                    ]}>
                    TOTAL RAISED
                  </PoppinsBold>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <PoppinsBold
                      style={[
                        styles.progressBarAmountSymbol,
                        {
                          color: Colors[colorScheme].brandLightGreen,
                        },
                      ]}>
                      $
                    </PoppinsBold>
                    <PoppinsBold
                      style={[
                        styles.progressBarPrimaryAmount,
                        {
                          color: Colors[colorScheme].brandLightGreen,
                        },
                      ]}>
                      {clipDecimal(amountRaised)[0]}
                    </PoppinsBold>
                    <PoppinsBold
                      style={[
                        styles.progressBarSecondaryAmount,
                        {
                          color: Colors[colorScheme].brandLightGreen,
                        },
                      ]}>
                      {clipDecimal(amountRaised)[1]}
                    </PoppinsBold>
                  </View>
                </View>
              )}
            </AnimatedCircularProgress>
            <View style={styles.hardCapCOntainer}>
              <PoppinsBold
                style={[styles.progressBarText, { color: Colors[colorScheme].contentSecondary }]}>
                $2M HARD CAP
              </PoppinsBold>
            </View>
          </View>
          {/* Kelp */}
          <View
            style={[
              styles.tokenCardContainer,
              {
                marginTop: 25,
              },
            ]}>
            <View style={styles.tokenCardWrapper}>
              <View lightColor="#fff" style={styles.cardLeftContent}>
                <View lightColor="#fff" style={styles.iconContainer}>
                  <KelpIcon />
                </View>
                <View lightColor="#fff">
                  <PoppinsBold style={styles.currencyTitlePrimary}>KELP</PoppinsBold>
                  <PoppinsBold
                    style={[
                      styles.currencyTitleSecondary,
                      { color: Colors[colorScheme].contentSecondary },
                    ]}>
                    KELP
                  </PoppinsBold>
                </View>
              </View>
              <View lightColor="#fff" style={styles.cardRightContent}>
                <PoppinsBold style={styles.currencyTitlePrimary}>
                    {kelpBalance}
                </PoppinsBold>
                <PoppinsBold
                  style={[
                    styles.currencyTitleSecondary,
                    { color: Colors[colorScheme].contentSecondary },
                  ]}>
                  ${clipDecimal(kelpValue)[0]}
                  {clipDecimal(kelpValue)[1]}
                </PoppinsBold>
              </View>
            </View>
          </View>
          {/* BNB */}
          <View
            style={[
              styles.tokenCardContainer,
              {
                marginTop: 15,
                marginBottom: 25,
              },
            ]}>
            <View style={styles.tokenCardWrapper}>
              <View lightColor="#fff" style={styles.cardLeftContent}>
                <View lightColor="#fff" style={styles.iconContainer}>
                  <BNBIcon />
                </View>
                <View lightColor="#fff">
                  <PoppinsBold style={styles.currencyTitlePrimary}>BNB</PoppinsBold>
                  <PoppinsBold
                    style={[
                      styles.currencyTitleSecondary,
                      { color: Colors[colorScheme].contentSecondary },
                    ]}>
                    Binance Smart Chain
                  </PoppinsBold>
                </View>
              </View>
              <View lightColor="#fff" style={styles.cardRightContent}>
                <PoppinsBold style={styles.currencyTitlePrimary}>
                  {bnbBalance}
                </PoppinsBold>
                <PoppinsBold
                  style={[
                    styles.currencyTitleSecondary,
                    { color: Colors[colorScheme].contentSecondary },
                  ]}>
                  ${clipDecimal(bnbValue)[0]}
                  {clipDecimal(bnbValue)[1]}
                </PoppinsBold>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={() => navigation.navigate('BuyKelpModal')} style={styles.button}>
            Buy
          </Button>
          <Button
            onPress={() => navigation.navigate('AddressModal')}
            style={[
              styles.button,
              {
                marginLeft: 10,
              },
            ]}>
            Deposit BNB
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
