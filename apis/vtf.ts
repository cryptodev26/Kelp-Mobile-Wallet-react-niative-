import axios from 'axios';

import { baseUrl } from '../constants/Urls';

export async function getVtf(): Promise<any> {
  try {
    const { data } = await axios.get(
      `${baseUrl}/variable-transaction-fees?_limit=1&_sort=id:DESC`,
      {
        headers: {
          'content-type': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
        },
      }
    );
    return data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message[0]?.messages[0]?.message ?? 'Something went wrong';

    throw new Error(errorMessage);
  }
}
