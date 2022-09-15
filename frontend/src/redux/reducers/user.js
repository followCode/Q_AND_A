import * as ActionTypes from '../actionTypes';

export const user = (
  state = {
    token: '',
    refreshToken: ''
  },
  action,
) => {
  switch (action.type) {
    case ActionTypes.UPDATE_TOKEN:
      return {
        ...state,
        token: action.token,
        refreshToken: action.refreshToken,
      };
    default:
      return state;
  }
};
