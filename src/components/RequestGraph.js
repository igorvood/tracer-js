import axios from "axios";

export const baseUrl = "http://localhost:8080/arrows/byGroup/rto_graph"


const requestGraph = (url)=>{

    let result;

    axios.get(url,
        {
            headers: {
                'accept': '*/*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT'
            }
        })

        .then((resData)=> {
                console.log(resData.data)
                // this.setState({t: resData.data})
            result = resData

            }

        )
        .catch(error => {
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
        })
    return result;
}

export default requestGraph
