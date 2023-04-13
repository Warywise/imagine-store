import { AxiosError, AxiosResponse } from "axios";

export interface LoginReturn {
  email: string;
  name: string;
  token: string;
  error?: string;
}

export interface CreateUser {
  email: string,
  name: string,
  lastName: string,
  hash: string,
  cpf?: string,
}
