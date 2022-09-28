import * as ActionTypes from '../actionTypes';
import {UNABLE_TO_CONNECT} from '../../errorMessages/common';
import {
  INAVLID_CREDENTIALS,
  NOT_ABLE_TO_VALIDATE,
} from '../../errorMessages/auth';
import config from '../../config/config';

function handleAuthResponseStatus() {
  return response => {
    if (response.status === 401) {
      throw new Error(INAVLID_CREDENTIALS);
    } else if (response.status !== 200) {
      throw new Error(NOT_ABLE_TO_VALIDATE);
    }
    return response.json();
  };
}

export const signInUser =
  (credentials, errorCallback = {}) =>
  dispatch => {
    console.log(credentials)
    return fetch(config.SERVER_BASE_URL + 'token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
      .catch(err => {
        console.log(err);
        throw new Error(UNABLE_TO_CONNECT);
      })
      .then(handleAuthResponseStatus())
      .then(data => {
        dispatch(updateUser(data));
        errorCallback("")
      })
      .catch(err => {
        console.error(err);
        errorCallback(err.message);
      });
  };

export const registerUser =
  (credentials, errorCallback = {}, successCallback = {}) =>
  dispatch => {
  console.log(credentials)
  return fetch(config.SERVER_BASE_URL + 'register/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
    .catch(err => {
      console.log(err);
      throw new Error(UNABLE_TO_CONNECT);
    })
    .then(response => {
      response.json().then((data) => {
        if(response.status === 400) {
          errorCallback(Object.values(data).join("\n"));
        } else {
          successCallback();
        }
      })
    })
    .catch(err => {
      console.error(err);
      errorCallback(err.message);
    });
};

export const updateUser = data => {
  return {
    type: ActionTypes.UPDATE_TOKEN,
    token: data.access,
    refreshToken: data.refresh
  };
};
