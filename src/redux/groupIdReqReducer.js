import {GROUP_ID_FROM_EDIT, GROUP_ID_FOR_REQUEST} from "./types";
import {createStore} from "redux";

const initialState = {
    groupId: 'dasdad',
    groupIdFromEdit: 'groupIdFromEdit'
}

export const groupIdReqReducer = (state = initialState, action) => {
    console.log('groupIdReqReducer > ', action)
    // console.log('groupIdReqReducer > ', state)
    switch (action.type) {
        case GROUP_ID_FOR_REQUEST:
            return {
                ...state,
                groupId: state.groupIdFromEdit
            }
        case GROUP_ID_FROM_EDIT:
            return {
                ...state,
                groupIdFromEdit: action.text
            }
        default:
            return state;
    }
}

// export const groupIdReqReducerStore = createStore(groupIdReqReducer)