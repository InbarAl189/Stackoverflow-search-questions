import en from '../locale/en.json';
import { LocaleReducer, ReducerAction } from '../types';
import { INIT_LOCALE } from '../constants/ActionTypes';

const INITIAL_STATE: LocaleReducer = {
  strings: en
};

export default (state: LocaleReducer = INITIAL_STATE, action: ReducerAction): LocaleReducer => {
  switch (action.type) {
    case INIT_LOCALE: {
      return { ...state, strings: action.payload };
    }

    default: return { ...state };
  }
};
