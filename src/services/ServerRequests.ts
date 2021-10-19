import axios, { AxiosResponse } from 'axios';
import { RequestWrapperPayload } from '../types';

const requestInstance: any = axios.create({
  baseURL: 'https://api.stackexchange.com/2.3',
  headers: {
    'content-type': 'application/json'
  },
  timeout: 20000
});

export const requestWrapper = ({ method, url, params = {} }: RequestWrapperPayload): Promise<AxiosResponse> => {
  try {
    return requestInstance[method](url, method === 'get' ? { params } : params);
  } catch (error) {
    return Promise.reject(error);
  }
};
