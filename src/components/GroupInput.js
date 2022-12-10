import React from "react";
import {Button} from "@mui/material";
import {connect} from "react-redux";
import {GROUP_ID_FROM_EDIT, GROUP_ID_REQ} from "../redux/types";

function GroupInput(props) {
    console.log('render GroupInput >',props)
    return (<div>
        <h3>{props.groupId}</h3>
        <input placeholder={'Введите группу'}
               // onClick={this.inputClick}
               onChange={event =>  props.onGroupIdEdit(event.target.value)}
               // onInput={props.onGroupIdEdit}
               // onfocusout={onChange}
        />
        <Button variant="text"
                onClick={props.saveGroupId}
        >Начать трассировку</Button>
    </div>)

}
// получает проперти из редакса
// тут state это state из redux
function mapToProps(state){

    console.log('GroupInput mapToProps > ', state)
    return {
        groupIdFromEdit: state.groupIdFromEdit,
        groupId: state.groupId
    }

}


function mapDispatchToProps(dispatch){
    return {
        onGroupIdEdit: (data) => {
            // console.log('mapDispatchToProps ', data)
            const action = {
                type: GROUP_ID_FROM_EDIT,
                value: data
            }
            dispatch(action)
        },
        saveGroupId: () => {
        // console.log('mapDispatchToProps ', data)
        const action = {
            type: GROUP_ID_REQ,
        }
        dispatch(action)
    }
    }

}

export default connect(mapToProps, mapDispatchToProps)(GroupInput )