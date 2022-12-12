import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {inputTextAction, traceAction} from "../redux/actions";

function GroupInput(props) {

    const dispatch = useDispatch()
    const groupId = useSelector(state => {
        const {groupIdReqReducer} = state

        return groupIdReqReducer.groupIdFromEdit
    })

    const handleChangeGroup = (e) => {
        dispatch(inputTextAction(e.target.value))
    }

    const handleTrace = (e) => {
        console.log('handleTrace > ', e)
        dispatch(traceAction())
    }


    return (<div>
        <h3>{groupId}</h3>
        <input placeholder={'Введите группу'}
               onChange={event => handleChangeGroup(event)}
        />
        <Button variant="text"
                onClick={event => handleTrace(event)}
        >Начать трассировку</Button>
    </div>)

}


export default GroupInput