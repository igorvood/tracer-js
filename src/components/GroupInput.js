import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {inputTextAction} from "../redux/actions";

function GroupInput(props) {

    const dispatch = useDispatch()
    const groupId = useSelector(state => {
        const {groupIdReqReducer} = state
        console.log('useSelector > ', state)
        return groupIdReqReducer.groupIdFromEdit
    })

    const handleChange = (e) => {
        dispatch(inputTextAction(e.target.value))
    }


    return (<div>
        <h3>{groupId}</h3>
        <input placeholder={'Введите группу'}
            // onClick={this.inputClick}
               onChange={event => handleChange(event)}
            // onInput={props.onGroupIdEdit}
            // onfocusout={onChange}
        />
        <Button variant="text"
                // onClick={props.saveGroupId}
        >Начать трассировку</Button>
    </div>)

}


export default GroupInput