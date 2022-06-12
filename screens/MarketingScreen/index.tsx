import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useCallback, useMemo, useState } from 'react';

import MarketingPager from '../../components/DynamicPager';
import { MarketingType } from '../../constants/Marketing';
import { useAuthContext } from '../../hooks/useAuth';
import { useMarketingContext } from '../../hooks/useMarketing';
import { MarketingStackParamList, RootStackScreenProps } from '../../navigation/types';
import { publicMarketingCardList, privateMarketingCardList } from './constants/marketingData';

export const MarketingStack = createNativeStackNavigator<MarketingStackParamList>();

export default function MarketingScreen({
  route,
}: RootStackScreenProps<'Marketing'>): JSX.Element | null {
  const { setIsOptionalContentSeen } = useAuthContext();
  const { activeMarketingInfo } = useMarketingContext();
  const [marketingCardIdx, setMarketingCardIdx] = useState<number>(0);

  const marketingCardList = useMemo(() => {
    switch (activeMarketingInfo?.type) {
      case MarketingType.PRIVATE:
        return privateMarketingCardList;
      case MarketingType.PUBLIC:
        return publicMarketingCardList;
      default:
      // TODO: Skip if no marketing available
    }
    return publicMarketingCardList;
  }, [activeMarketingInfo]);

  const handleNextCard = useCallback(() => {
    if (marketingCardList) {
      if (marketingCardIdx + 1 < marketingCardList.length) {
        setMarketingCardIdx((prevOnboardingCardIdx) => prevOnboardingCardIdx + 1);
      } else {
        setIsOptionalContentSeen(true);
      }
    }
  }, [marketingCardIdx, marketingCardList]);

  const marketingCard = useMemo(
    () => marketingCardList[marketingCardIdx],
    [marketingCardIdx, marketingCardList]
  );

  const marketingPagerComponent = useCallback(
    (props) => (
      <MarketingPager
        {...props}
        {...marketingCard}
        handleNextCard={handleNextCard}
        handleSkip={() => setIsOptionalContentSeen(true)}
      />
    ),
    [handleNextCard, marketingCard, activeMarketingInfo, marketingCardList]
  );

  /**
   * Hold rendering until marketing type is resolved
   */
  if (activeMarketingInfo?.type === null) {
    return null;
  }

  return (
    <MarketingStack.Navigator>
      <MarketingStack.Screen
        name="MarketingPagerPanel"
        options={{
          headerShown: false,
        }}>
        {marketingPagerComponent}
      </MarketingStack.Screen>
    </MarketingStack.Navigator>
  );
}
