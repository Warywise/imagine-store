import axios, { AxiosError } from 'axios';
import { LoginReturn } from '../interfaces/auth';

const URL = 'http://localhost:3001';

type LoginData = { email: string, hash: string };
type GetUserData = { email: string, token: string };

export async function axiosLogin({ email, hash }: LoginData): Promise<LoginReturn> {
  try {
    return await axios({
      method: 'POST',
      url: `${URL}/auth/login`,
      data: { email, hash },
      timeout: 10000,
    }).then((response) => response.data) as LoginReturn;
  } catch (error) {
    const { response } = error as AxiosError;
    return response?.data;
  }
}

export async function axiosGetUser({ email, token: authorization }: GetUserData) {
  try {
    return await axios({
      method: 'GET',
      url: `${URL}/users`,
      headers: { authorization, email },
      timeout: 10000,
    }).then((response) => response.data);
  } catch (error) {
    const { response } = error as AxiosError;
    return response?.data;
  }
}

export async function axiosRefreshToken({ email, token: authorization }: GetUserData) {
  try {
    return await axios({
      method: 'POST',
      url: `${URL}/auth/refresh`,
      headers: { authorization },
      data: { email },
      timeout: 10000,
    }).then((response) => response.data);
  } catch (error) {
    const { response } = error as AxiosError;
    return response?.data;
  }
}

export async function axiosGetter(url: string) {
  try {
    return await axios({
      method: 'GET',
      url: `${URL}${url}`,
      timeout: 10000,
    }).then((response) => response.data);
  } catch (error) {
    const { response } = error as AxiosError;
    return response?.data;
  }
}
