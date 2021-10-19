import { Method } from 'axios';

export interface ReducerAction {
  type: string,
  payload: any
}

export type RootStackParamList = {
  Main: undefined,
  WebviewPage: undefined
}

export interface Store {
  locale: LocaleReducer,
  theme: ThemeReducer,
  search: SearchReducer
}

export interface LocaleReducer {
    strings: any,
}

export interface ThemeReducer {
  isDarkMode: boolean
}

export interface SearchReducer {
 userData: UserData
}

export interface RequestWrapperPayload {
  method: Method,
  url: string,
  params?: any,
  isAnonymous?: boolean,
  isLogin?: boolean
}

export interface UserData {
  profileImage: string,
  displayName: string,
  profileLink: string,
  reputation: string,
  acceptRate: string,
  questions: any
}
