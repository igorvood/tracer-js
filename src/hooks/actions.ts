import {useDispatch} from "react-redux";
import {bindActionCreators} from "@reduxjs/toolkit";
import {tracerActions} from "../store/tracer/tracer.slice";

const actions = {
    ...tracerActions
}

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(actions, dispatch)
}