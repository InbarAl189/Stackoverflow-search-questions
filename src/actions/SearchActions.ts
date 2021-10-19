import { Alert } from 'react-native';
import { UserData } from '../types';
import en from '../locale/en.json';
import { GET_USER_DATA, SET_USER_QUESTIONS } from '../constants/ActionTypes';

export const getUserData = (userData: UserData) => async (dispatch: any) => {
  try {
    dispatch({ type: GET_USER_DATA, payload: userData });
  } catch (error) {
    Alert.alert(en?.search?.generalError);
  }
};

export const sortUserQuestions = (sortCategory: string) => (dispatch: any) => {
  dispatch({ type: SET_USER_QUESTIONS, payload: sortCategory });
};
