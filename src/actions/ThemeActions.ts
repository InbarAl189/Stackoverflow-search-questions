import { SET_DARK_MODE } from '../constants/ActionTypes';

export const setDarkMode = (isDarkMode: boolean) => (dispatch: any) => dispatch({ type: SET_DARK_MODE, payload: isDarkMode });
