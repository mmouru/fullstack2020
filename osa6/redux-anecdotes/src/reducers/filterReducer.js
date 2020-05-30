const filterReducer = (state = '', action) => {
    switch(action.type){
        case 'FILTER':
         return action.filter
        case 'RESET':
            return state
        default:
            return state
    }
}

export const filterChange = (filter) => {
    return {
        type: 'FILTER',
        filter
    }
}

export default filterReducer