import config from '../../config/config';
import {UNABLE_TO_CONNECT} from '../../errorMessages/common';

export const getQuestions = (token, errorCallback = {}, successCallback = {}) => dispatch => {
    return fetch(config.SERVER_BASE_URL + 'questions/', {
        method: 'GET',
        headers: {
        'Authorization': 'Bearer ' + token,
        }
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
            successCallback(data);
        }
        })
    })
    .catch(err => {
        console.log(err)
        errorCallback(err)
    })
};
