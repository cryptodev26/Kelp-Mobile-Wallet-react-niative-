import constate from 'constate';
import { useEffect, useState } from 'react';

import { getActiveMarketingInfo, MarketingInfo } from '../apis/flags';

function useMarketing() {
  const [activeMarketingInfo, setActiveMarketingInfo] = useState<MarketingInfo | undefined>(
    undefined
  );

  useEffect(() => {
    getActiveMarketingInfo().then((value) => setActiveMarketingInfo(value));
  }, []);

  return {
    activeMarketingInfo,
  };
}

const [MarketingProvider, useMarketingContext] = constate(useMarketing);

export { useMarketingContext, MarketingProvider };
