import SearchActionTypes from "./search.types";

export const addToList = list => ({
    type: SearchActionTypes.ADD_TO_LIST,
    payload: list
})