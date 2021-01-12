import SearchActionTypes from "./search.types"

const INITIAL_STATE = {
    searchList: []
}

const searchReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case SearchActionTypes.ADD_TO_LIST:
            return {
                ...state,
                searchList: action.payload
            }
        default:
            return state
    }
}

export default searchReducer