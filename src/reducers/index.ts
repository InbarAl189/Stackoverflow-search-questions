import { combineReducers } from 'redux';
import LocaleReducer from './LocaleReducer';
import ThemeReducer from './ThemeReducer';
import SearchReducer from './SearchReducer';

export default combineReducers({
  locale: LocaleReducer,
  theme: ThemeReducer,
  search: SearchReducer
});
