import React from "react";
import {Button} from "@mui/material";

class GroupInput extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            t: "Введите имя группы",
            groupId: "",
            groupIdRunned: "",
        }

        this.inputClick = this.inputClick.bind(this)
        this.buttonClick = this.buttonClick.bind(this)
    }


    render() {
        return <div>
            <h3>{this.state.groupIdRunned}</h3>
            <h3>{this.t}</h3>
            <input placeholder={this.state.t}
                   onClick={this.inputClick}
                   onChange={event => this.setState({groupId: event.target.value})}
            />
            <Button variant="text" onClick={this.buttonClick}
            >Начать трассировку</Button>
        </div>

    }

    inputClick() {
        this.setState({t: "Новое значение"})
    }

    buttonClick() {
        console.log("запущено "+this.state.groupId)
        this.setState({groupIdRunned: "запущено "+this.state.groupId})
        // this.setState({groupIdRunned: "запущено "})
    }
}

export default GroupInput