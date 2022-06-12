/* eslint-disable prettier/prettier */
import axios from 'axios';

import { baseUrl } from '../constants/Urls';

export async function registerUser({ email, pin }: { email: string; pin: string }): Promise<any> {
  try {
    const response = await axios.post(
      `${baseUrl}/auth/local/register`,
      {
        username: email,
        email,
        password: pin,
      },
      {
        headers: {
          'content-type': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
        },
      }
    );
    return response;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message[0]?.messages[0]?.message ?? 'Something went wrong';

    throw new Error(errorMessage);
  }
}

export async function loginUser({ email, pin }: { email: string; pin: string }): Promise<any> {
  try {
    const response = await axios.post(
      `${baseUrl}/auth/local/?`,
      { identifier: email, password: pin },
      {
        headers: {
          'content-type': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
        },
      }
    );

    return response;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message[0]?.messages[0]?.message ?? 'Something went wrong';

    throw new Error(errorMessage);
  }
}

export async function isEmailAvailable(email: string): Promise<any> {
  return true;
}
