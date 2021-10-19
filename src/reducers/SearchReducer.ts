import _ from 'lodash';
import { ReducerAction, SearchReducer } from '../types';
import { GET_USER_DATA, SET_USER_QUESTIONS } from '../constants/ActionTypes';

const INITIAL_STATE: SearchReducer = {
  userData: {
    profileImage: '',
    displayName: '',
    profileLink: '',
    reputation: '',
    acceptRate: '',
    questions: []
  }
};

export default (state: SearchReducer = INITIAL_STATE, action: ReducerAction): SearchReducer => {
  switch (action.type) {
    case GET_USER_DATA: {
      return { ...state, userData: action.payload };
    }
    case SET_USER_QUESTIONS: {
      const { userData: { profileImage, displayName, profileLink, reputation, acceptRate } } = state;

      return { ...state,
        userData: {
          profileImage,
          displayName,
          profileLink,
          reputation,
          acceptRate,
          questions: _.sortBy(state.userData.questions, (item: any) => item[action.payload]).reverse()
        }
      };
    }

    default: return { ...state };
  }
};
