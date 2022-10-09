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


export const similarQuestions = (token, questionText, errorCallback = {}, successCallback = {}) => dispatch => {
    return fetch(config.SERVER_BASE_URL + 'similar-questions/', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "text": questionText
        })
    })
    .catch(err => {
        console.log(err);
        throw new Error(UNABLE_TO_CONNECT);
    })
    .then(response => {
        response.json().then((data) => {
        if(response.status === 400) {
            errorCallback(data);
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


export const addQuestion = (token, question, errorCallback = {}, successCallback = {}) => dispatch => {
    return fetch(config.SERVER_BASE_URL + 'questions/', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(question)
    })
    .catch(err => {
        console.log(err);
        throw new Error(UNABLE_TO_CONNECT);
    })
    .then(response => {
        response.json().then((data) => {
        if(response.status === 400) {
            errorCallback(data);
        } else {
            successCallback(data.id);
        }
        })
    })
    .catch(err => {
        console.log(err)
        errorCallback(err)
    })
};
