import React from "react";
import {Button} from "@mui/material";

class Uml extends React.Component{

     t = 'Введите имя группы'

    render() {
        return <div>
            <h3>{this.t}</h3>
            <input placeholder={this.t}/>
            <Button variant="text">Начать трассировку</Button>
        </div>
    }
}

export default Uml