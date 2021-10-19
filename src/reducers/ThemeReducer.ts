import { ReducerAction, ThemeReducer } from '../types';
import { SET_DARK_MODE } from '../constants/ActionTypes';

const INITIAL_STATE: ThemeReducer = {
  isDarkMode: false
};

export default (state: ThemeReducer = INITIAL_STATE, action: ReducerAction): ThemeReducer => {
  switch (action.type) {
    case SET_DARK_MODE: {
      return { ...state, isDarkMode: action.payload };
    }

    default: return { ...state };
  }
};
