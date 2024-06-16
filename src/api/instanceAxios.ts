import axios from 'axios';
import { apolloClient } from 'query';

export const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS;

export const instanceAxios = axios.create({
  withCredentials: true,
  baseURL: SERVER_ADDRESS,
});

instanceAxios.defaults.headers.common['Authorization'] = localStorage.getItem(
  'Authorization',
) as string;

export type ResponseType<D = {}> = {
  result: D;
  success: boolean;
  errorMessage: string;
};

export const isBadStatusCode = (status: number) => {
  return status > 204;
};

export const setConnectionId = (connectionId: string) => {
  instanceAxios.defaults.headers.common['ConnectionId'] = connectionId;
};

export const setAuthorizationToken = (token: string) => {
  instanceAxios.defaults.headers.common['Authorization'] = token;
  apolloClient.defaultContext.headers = {
    Authorization: token,
  };
};
