import { Dimensions } from 'react-native';

// Dimensions
export const SCREEN_HEIGHT: number = Dimensions.get('window').height;
export const SCREEN_WIDTH: number = Dimensions.get('window').width;

// Styles
export const BASIC_SHADOW_STYLES = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.2,
  shadowRadius: 3,
  elevation: 8,
  backgroundColor: '#fff'
};

// Colors
export const WHITE: string = '#fff';
export const BLACK: string = '#000';
