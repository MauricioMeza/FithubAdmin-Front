export const loginUser = userObj => ({
    type: 'LOG_IN_SESSION',
    payload: userObj
})

export const logoutUser = () => ({
    type: 'LOG_OUT_SESSION',
})