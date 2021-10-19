import { BLACK, WHITE } from '../constants/Constants';

export const getThemeStyle = (isDarkMode: boolean) => {
  if (isDarkMode) {
    return {
      BACKGROUND_COLOR: BLACK,
      TEXT_COLOR: WHITE,
      SEARCH_BAR: 'rgba(255,255,255,0.2)',
    };
  }
  return {
    BACKGROUND_COLOR: WHITE,
    TEXT_COLOR: BLACK,
    SEARCH_BAR: 'rgba(0,0,0,0.2)',
  };
};
