import { SET_SAR_NUMBER } from "../actions/settings"

const initalState = {
    SARnumber:''
}

export default (state = initalState, action) => {
    switch (action.type) {
        case SET_SAR_NUMBER:
            return{
                SARnumber:action.SARnumber
            };

        default:
            return state

    }
}