import {GROUP_ID_FOR_REQUEST, GROUP_ID_FROM_EDIT} from "./types";


export function inputTextAction(text) {
    return {
        type: GROUP_ID_FROM_EDIT,
        text
    }
}

export function traceAction() {
    return {
        type: GROUP_ID_FOR_REQUEST
    }
}