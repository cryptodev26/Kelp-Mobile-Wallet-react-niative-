import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { baseUrl } from '../constants/Urls';

export async function getAccount(): Promise<any> {
  const jwt = await AsyncStorage.getItem('USER');

  console.log(jwt);
  try {
    const data = await axios.get(`${baseUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return data;
  } catch (error: any) {
    /* const errorMessage =
      error.response?.data?.message[0]?.messages[0]?.message ?? 'Something went wrong';

    throw new Error(errorMessage); */
  }
}
