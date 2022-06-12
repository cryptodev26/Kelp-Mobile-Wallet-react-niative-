import React, { useMemo, useState } from 'react';
import { ScrollView } from 'react-native';

import InstagramIcon from '../../../assets/images/publicSale/instagram.svg';
import KelpIcon from '../../../assets/images/publicSale/kelp.svg';
import ProductHuntIcon from '../../../assets/images/publicSale/productHunt.svg';
import RedditIcon from '../../../assets/images/publicSale/reddit.svg';
import ShareIcon from '../../../assets/images/publicSale/share.svg';
import TelegramIcon from '../../../assets/images/publicSale/telegram.svg';
import TwitterIcon from '../../../assets/images/publicSale/twitter.svg';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { useMarketingContext } from '../../../hooks/useMarketing';
import { RootStackScreenProps } from '../../../navigation/types';
import { clipDecimal } from '../../../utils/currency';
import CountdownTimer from '../../CountdownTimer';
import { PoppinsBold, PoppinsMedium, PoppinsRegular } from '../../StyledText';
import { SafeAreaView, View } from '../../Themed';
import { PublicSaleDashboardStyles as styles } from './styles';

export default function PublicSaleDashboard({
  navigation,
}: RootStackScreenProps<'SaleDashboard'>): JSX.Element {
  const colorScheme = useColorScheme();

  const { activeMarketingInfo } = useMarketingContext();

  const [rank, setRank] = useState(112456);
  const [totalParticipant, setTotalParticipant] = useState(250000);

  const [points, setPoints] = useState(4);

  const viralMethods = useMemo(() => {
    return [
      {
        title: 'Join our Telegram Channel',
        icon: <TelegramIcon height={24} width={24} />,
        backgroundColor: '#0088CC',
        points: '+1',
      },
      {
        title: 'Follow @kelpfinance on Twitter',
        icon: <TwitterIcon height={24} width={24} />,
        backgroundColor: '#1DA1F2',
        points: '+1',
      },
      {
        title: 'Join Kelp on Reddit',
        icon: <RedditIcon height={24} width={24} />,
        backgroundColor: '#FF5700',
        points: '+1',
      },
      {
        title: 'Follow Kelp on Instagram',
        icon: <InstagramIcon height={24} width={24} />,
        backgroundColor: '#833AB4',
        points: '+1',
      },
      {
        title: 'Vote for Kelp on Product Hunt',
        icon: <ProductHuntIcon height={24} width={24} />,
        backgroundColor: '#DA552F',
        points: '+3',
      },
      {
        title: 'Subscribe to our email list',
        icon: <KelpIcon height={24} width={24} />,
        backgroundColor: '#46D6A2',
        points: '+1',
      },
      {
        title: 'Share with your friends',
        icon: <ShareIcon height={24} width={24} />,
        backgroundColor: '#F26B21',
        points: '+3',
      },
    ];
  }, []);

  return (
    <SafeAreaView>
      <ScrollView style={[styles.cardContainer]}>
        <View style={styles.contentContainer}>
          {/* Heading */}
          <View style={styles.headingContainer}>
            <PoppinsBold
              style={[styles.headingMainText, { color: Colors[colorScheme].brandLightGreen }]}>
              Kelp Airdrop
            </PoppinsBold>
          </View>

          {/* Countdown */}
          {activeMarketingInfo?.date && (
            <CountdownTimer
              date={activeMarketingInfo.date}
              onTimerComplete={() => navigation.replace('Root')}
            />
          )}

          {/* Rank */}
          <View style={[styles.infoCardContainer, { marginTop: 5 }]}>
            <View style={styles.infoCardWrapper}>
              <PoppinsBold
                style={[
                  styles.infoCardNumber,
                  {
                    color: Colors[colorScheme].brandLightGreen,
                  },
                ]}>
                {clipDecimal(rank)[0]}
              </PoppinsBold>
              <PoppinsBold
                style={[
                  styles.infoCardText,
                  {
                    color: Colors[colorScheme].contentSecondary,
                  },
                ]}>
                CURRENT POSITION OUT OF {clipDecimal(totalParticipant)[0]}
              </PoppinsBold>
            </View>
          </View>

          {/* Points */}
          <View style={[styles.infoCardContainer, { marginTop: 25 }]}>
            <View style={styles.infoCardWrapper}>
              <PoppinsBold
                style={[
                  styles.infoCardNumber,
                  {
                    color: Colors[colorScheme].brandLightGreen,
                  },
                ]}>
                {clipDecimal(points)[0]}
              </PoppinsBold>
              <PoppinsRegular
                style={[
                  styles.infoCardText,
                  {
                    color: Colors[colorScheme].contentSecondary,
                  },
                ]}>
                YOUR POINTS
              </PoppinsRegular>
            </View>
          </View>

          <View style={styles.descriptionContainer}>
            <PoppinsBold style={styles.descriptionHeading}>The Kelp Airdrop</PoppinsBold>

            <PoppinsRegular style={styles.description}>
              The more you participate, the higher your position, and the greater the chance to
              receive the airdrop!
            </PoppinsRegular>
          </View>

          {/* Checklist */}
          <View style={styles.checklistContainer}>
            {viralMethods.map((item, idx) => (
              <View
                key={idx}
                style={[
                  styles.checklistItemWrapper,
                  {
                    marginTop: idx === 0 ? 0 : 10,
                  },
                ]}>
                <View
                  style={[
                    styles.checklistItemIcon,
                    {
                      backgroundColor: item.backgroundColor,
                    },
                  ]}>
                  {item.icon}
                </View>

                <View style={styles.checklistItemTitleContainer}>
                  <PoppinsMedium style={styles.checklistItemTitle}>{item.title}</PoppinsMedium>
                </View>

                <View
                  style={[
                    styles.checklistItemPointsContainer,
                    {
                      backgroundColor: Colors[colorScheme].brandLightGreen,
                    },
                  ]}>
                  <PoppinsRegular style={styles.checklistItemPoints}>{item.points}</PoppinsRegular>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
