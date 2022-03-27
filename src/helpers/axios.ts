import axios, { AxiosError } from 'axios';
import { LoginReturn } from '../interfaces/auth';

const URL = 'http://localhost:3001';

type LoginData = { email: string, hash: string };

export async function axiosLogin(data: LoginData): Promise<LoginReturn> {
  try {
    return await axios({
      method: 'POST',
      url: `${URL}/auth/login`,
      data,
      responseType: 'json'
    }).then((response) => response.data) as LoginReturn;
  } catch (error) {
    const { response } = error as AxiosError;
    return response?.data;
  }
}
