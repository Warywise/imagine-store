import { AxiosError, AxiosResponse } from 'axios';
// import { LoginReturn } from './auth';

export interface PropChild {
  children: JSX.Element | JSX.Element[];
}

export interface AxiosErrorResponse<T> extends AxiosError {
  response: AxiosResponse<T>
}

export type anyType = string | number | boolean | { [key: string]: anyType } | Array<anyType>;
