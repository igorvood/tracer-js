import React from "react";

class GroupInput extends React.Component{

     t = 'Введите имя группы'

    render() {
        return <div>
            <h1>{this.t}</h1>
            <input placeholder={this.t}/>
            <Button variant="text">Text</Button>

        </div>
    }
}

export default GroupInput