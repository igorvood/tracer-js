import React from "react";
import {Button} from "@mui/material";
import axios from "axios";

const baseUrl = "http://localhost:9091/arrows/byGroup/rto_graph"

// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';


class Uml extends React.Component{

    constructor(props) {
        super(props);

        axios.get(baseUrl,
            {
                headers: {
                    'accept': '*/*',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT'
                }
            })

            .then((resData)=> {
                console.log(resData.data)
            this.setState({t: resData.data})
            }

        )
            .catch(function (error) {
                if (error.response) { // get response with a status code not in range 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) { // no response
                    console.log(error.request);
                    // instance of XMLHttpRequest in the browser
                    // instance ofhttp.ClientRequest in node.js
                } else { // Something wrong in setting up the request
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });

        this.state = {
             t: [],
        }


    }

     t = 'Введите имя группы'

    render() {
        return <div>
            {this.t}
        </div>
    }
}

export default Uml