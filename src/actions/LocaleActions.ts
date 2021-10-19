import en from '../locale/en.json';
import { INIT_LOCALE } from '../constants/ActionTypes';

export const initLocale = () => (dispatch: any) => dispatch({ type: INIT_LOCALE, payload: en });
