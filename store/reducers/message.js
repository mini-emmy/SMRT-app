import {ADD_MESSAGE, DELETE_MESSAGE, LOAD_MESSAGES} from '../actions/message';

const initialState = {
    messages: []

};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                messages: state.messages.concat(action.message)
            };

        case DELETE_MESSAGE:
            return {
                messages: state.messages.filter(item => item !== action.message) 
            };
        case LOAD_MESSAGES:
            return {
                messages: action.messages
            };

        default:
            return state

    }

};