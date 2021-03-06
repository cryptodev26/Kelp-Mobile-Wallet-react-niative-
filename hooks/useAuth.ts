import constate from 'constate';
import { useCallback, useEffect, useRef, useState } from 'react';

import { loginUser, registerUser } from '../apis/auth';
import { Onboarding } from '../constants/OnboardingStatus';
import { usePersistentState } from './usePersistentState';

function useAuth() {
  const [user, setUser] = usePersistentState<any>(undefined, 'USER');
  const [jwt, setJwt] = usePersistentState<any>(undefined, 'JWT');
  const [incorrectPinAttemptCount, setIncorrectPinAttemptCount] = useState(0);
  const [onboardingState, setOnboardingState] = usePersistentState<Onboarding>(
    Onboarding.USER_AGREEMENT_PENDING,
    'ONBOARDING_STATE'
  );
  const [localPin, setLocalPin] = usePersistentState<string | undefined>(undefined, 'PIN');
  const [isAuthComplete, setIsAuthComplete] = useState<boolean>(false);

  /**
   * If onboarding complete then initialize with true since optional content
   * should be not be shown again if skipped
   */
  const isOptionalContentSeenInitialized = useRef(false);
  const [isOptionalContentSeen, setIsOptionalContentSeen] = useState<boolean | undefined>(
    undefined
  );
  useEffect(() => {
    if (!isOptionalContentSeenInitialized.current && onboardingState) {
      setIsOptionalContentSeen(onboardingState === Onboarding.COMPLETE);
      isOptionalContentSeenInitialized.current = true;
    }
  }, [onboardingState]);

  const [isLoading, setIsLoading] = useState(false);

  /**
   * If more that 3 incorrect pin are entered
   * the user info is removed from store
   */
  useEffect(() => {
    if (incorrectPinAttemptCount > 2) {
      setUser(null);
      setIncorrectPinAttemptCount(0);
    }
  }, [incorrectPinAttemptCount]);

  const login = useCallback(({ email, pin }: { email: string; pin: string }) => {
    setIsLoading(true);

    return loginUser({ email, pin })
      .then(({ data }) => {
        setIsLoading(false);
        setUser(data.user);
        setJwt(data.jwt);
        setIncorrectPinAttemptCount(0);
      })
      .catch((error) => {
        setIsLoading(false);
        throw error;
      });
  }, []);

  const register = useCallback(({ email, pin }: { email: string; pin: string }) => {
    setIsLoading(true);

    return registerUser({ email, pin })
      .then(({ data, status }) => {
        setIsLoading(false);
        setUser(data.user);
        setIncorrectPinAttemptCount(0);
      })
      .catch((error) => {
        setIsLoading(false);
        throw error;
      });
  }, []);

  const incrementIncorrectAttemptCount = useCallback(() => {
    setIncorrectPinAttemptCount((prevCount) => prevCount + 1);
  }, []);

  return {
    user,
    jwt,
    isAuthComplete,
    login,
    register,
    onboardingState,
    setIsAuthComplete,
    isLoading,
    incrementIncorrectAttemptCount,
    setOnboardingState,
    setLocalPin,
    localPin,
    isOptionalContentSeen,
    setIsOptionalContentSeen,
  };
}

const [AuthProvider, useAuthContext] = constate(useAuth);

export { useAuthContext, AuthProvider };
