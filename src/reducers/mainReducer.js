const initialState = {
    user: JSON.parse(localStorage.getItem('user'))
}

const reducerStore = (state = initialState, action) => {
    switch(action.type) {
        case "LOG_IN_SESSION":
            return {
                ...state,
                user: action.payload
            }
        case "LOG_OUT_SESSION":
            return {
                ...state,
                user: {}
            }
        default:
            return state;
    }  
}

export default reducerStore