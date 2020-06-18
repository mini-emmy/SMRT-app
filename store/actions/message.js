import { addMessage, deleteMessage, getMessages } from '../../helpers/db';

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';
export const LOAD_MESSAGES = 'LOAD_MESSAGES';

export const addSARMessage = (message) => {
    return async dispatch => {
        console.log("add Sarmessage" + message);
        try {
            const dbResult = await addMessage(message);
        } catch (err) {
            throw err;
        }

        dispatch({ type: ADD_MESSAGE, message: message })

    };
};

export const deleteSARMessage = (message) => {
    return async dispatch => {
        console.log(message);
        try {
            const dbResult = await deleteMessage(message);
        } catch (err) {
            throw err;
        }

        dispatch({ type: DELETE_MESSAGE, message: message })

    };
};

export const getSARMessages = () => {
    return async dispatch => {

        try {
            const dbResult = await getMessages();
            const existingMessages = [];
            dbResult.rows._array.map(item => existingMessages.push(item.message))
            console.log(existingMessages);
            dispatch({ type: LOAD_MESSAGES, messages: existingMessages })


        } catch (err) {
            throw err;
        }

    };
};