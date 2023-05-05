import axios from 'axios';
import { CreateUser, LoginReturn } from '../interfaces/auth';
import { AxiosErrorResponse, anyType } from '../interfaces/default';

const URL = process.env.NODE_ENV === 'production'
  ? 'https://an-awesome-api.vercel.app/'
  : 'http://localhost:3001';

type LoginData = { email: string, hash: string };
type GetUserData = { email: string, token: string };

export async function fetchLogin({ email, hash }: LoginData): Promise<LoginReturn> {
  try {
    return await axios({
      method: 'POST',
      url: `${URL}/auth/login`,
      data: { email, hash },
      timeout: 10000,
    }).then((response) => response.data) as LoginReturn;
  } catch (error) {
    const { response } = error as AxiosErrorResponse<LoginReturn>;
    return response?.data;
  }
}

export async function fetchUser({ email, token: authorization }: GetUserData) {
  try {
    return await axios({
      method: 'GET',
      url: `${URL}/users`,
      headers: { authorization, email },
      timeout: 10000,
    }).then((response) => response.data);
  } catch (error) {
    const { response } = error as AxiosErrorResponse<LoginReturn>;
    return response?.data;
  }
}

export async function fetchUserInfos({ email, token: authorization }: GetUserData) {
  try {
    return await axios({
      method: 'GET',
      url: `${URL}/users/infos`,
      headers: { authorization, email },
      timeout: 10000,
    }).then((response) => response.data);
  } catch (error) {
    const { response } = error as AxiosErrorResponse<LoginReturn>;
    return response?.data;
  }
}

export async function fetchRefreshToken({ email, token: authorization }: GetUserData) {
  try {
    return await axios({
      method: 'POST',
      url: `${URL}/auth/refresh`,
      headers: { authorization },
      data: { email },
      timeout: 10000,
    }).then((response) => response.data);
  } catch (error) {
    const { response } = error as AxiosErrorResponse<LoginReturn>;
    return response?.data;
  }
}

export async function fetcherGet(url: string, filter?: { [key: string]: anyType }) {
  try {
    return await axios({
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      method: 'GET',
      url: `${URL}${url}`,
      params: { ...filter },
      timeout: 10000,
    }).then((response) => response.data);
  } catch (error) {
    const { response } = error as AxiosErrorResponse<LoginReturn>;
    return response?.data;
  }
}

export async function fetcherCreateUser(data: CreateUser) {
  try {
    return await axios({
      method: 'POST',
      url: `${URL}/users`,
      data,
      timeout: 10000,
    }).then((response) => response.data);
  } catch (error) {
    const { response } = error as AxiosErrorResponse<LoginReturn>;
    return response?.data;
  }
}
