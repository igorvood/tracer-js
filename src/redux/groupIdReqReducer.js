import {GROUP_ID_FROM_EDIT, GROUP_ID_REQ} from "./types";
import {createStore} from "redux";

const initialState = {
    groupId: 'dasdad',
    groupIdFromEdit: 'groupIdFromEdit'
}

export const groupIdReqReducer = (state = initialState, action) => {
    console.log('groupIdReqReducer > ', action)
    // console.log('groupIdReqReducer > ', state)
    switch (action.type) {
        case GROUP_ID_REQ:
            return {
                ...state,
                groupId: state.groupIdFromEdit
            }
        case GROUP_ID_FROM_EDIT:
            return {
                ...state,
                groupIdFromEdit: action.value
            }
        default:
            return state;
    }
}

// export const groupIdReqReducerStore = createStore(groupIdReqReducer)