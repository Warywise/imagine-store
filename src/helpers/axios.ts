import axios from 'axios';
import { LoginReturn } from '../interfaces/auth';

const URL = process.env.REACT_APP_URL || 'http://localhost:3001';

export async function axiosLogin(data: { email: string, hash: string }): Promise<LoginReturn> {
  return await axios({
    method: 'POST',
    url: `${URL}/auth/login`,
    data,
    responseType: 'json'
  }).then((response) => response.data) as LoginReturn;
}
