import {GROUP_ID_REQ} from "./types";

const initialState = {
    groupId: ''
}

export const groupIdReqReducer = (state = initialState, action) => {
    console.log('groupIdReqReducer > ', action)
    switch (action.type) {
        case GROUP_ID_REQ:
            return {
                ...state,
                groupId: state.groupIdFromEdit
            }
        default:
            return state;
    }
}