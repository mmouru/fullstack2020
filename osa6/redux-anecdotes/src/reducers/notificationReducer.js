const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION' :
            return action.notification
        case 'HIDE_NOTIFICATION' : 
            return null
        default:
            return state
    }
}

var timeOut

export const setNotification = (notification, time) => {
    if (timeOut){clearTimeout(timeOut)}
        return async dispatch => {
            await dispatch({
                type: 'SET_NOTIFICATION',
                notification
            })
            timeOut = setTimeout(() => {
                dispatch({
                    type:'HIDE_NOTIFICATION'
                })
            }, time * 1000)
        }
}

export default notificationReducer