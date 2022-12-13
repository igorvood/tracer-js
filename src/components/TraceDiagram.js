import axios from "axios";
import {baseUrl} from "./RequestGraph";
import * as go from "gojs";
import {useSelector} from "react-redux";

function TraceDiagram(props) {

    const requestData = (groupIdName) => {
        let nodesLocal
        let arrowsLocal
        let promise = axios.get(baseUrl + groupIdName,
            {
                headers: {
                    'accept': '*/*',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT'
                }
            })
            .then((resData) => {

                    nodesLocal = resData.data.nodes
                    arrowsLocal = resData.data.arrows
                    console.log('REST resData.data.nodes >', resData.data.nodes)
                    console.log('REST resData.data.arrows >', resData.data.arrows)

                    return {
                        nodes: resData.data.nodes,
                        arrows: resData.data.arrows

                    }
                }
            );


        console.log('promise.nodes > ', promise.nodes)
        console.log('promise.arrows > ', promise.arrows)

        // const printAddress =  () => {
        //     const a = await promise;
        //     let newVar = {
        //         nodes: a.nodes,
        //         arrows: a.arrows
        //     };
        //     console.log('newVar > ', newVar)
        //     return newVar;
        // };
        //
        //
        // let optionalParams = printAddress();
        // console.log('promise ', optionalParams)
        return {
            nodes: nodesLocal,
            arrows: arrowsLocal
        }
    }

    const remapData = (restData) => {

        const {nodes, arrows} = restData

        let nodeColor = [];
        let nodeText = [];

        console.log('restData > ', restData)
        console.log('nodes > ', nodes)
        console.log('arrows > ', arrows)
        let arrowsRemap = []
        let nodesRemap = []
        // let nodesRemap = nodes
        //     .map(n => {
        //     if (n.typeNode === 'TOPIC')
        //         if (n.time === null) {
        //             nodeText = n.name
        //             nodeColor = 'pink'
        //         } else {
        //             nodeText = n.name + "\ntime:" + n.time
        //             nodeColor = 'lightgreen'
        //         }
        //     else {
        //         nodeText = n.name
        //         nodeColor = 'lightblue'
        //     }
        //     return {
        //         key: n.index,
        //         text: nodeText,
        //         color: nodeColor
        //     }
        // });
        //
        // let arrowsRemap = arrows.map(function (a) {
        //     return {
        //         key: a.index,
        //         from: a.from,
        //         to: a.to
        //     }
        // });

        return {
            nodesRemap,
            arrowsRemap
        }
    }


    const groupId = useSelector(state => {
        const {groupIdReqReducer} = state
        console.log('groupId > ', state)
        const groupId = groupIdReqReducer.groupId;
        const reqData = requestData(groupId);
        return remapData(reqData)
        // return null
    })

    function initDiagram() {
        const $ = go.GraphObject.make;
        // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
        const diagram =
            $(go.Diagram,
                {
                    'undoManager.isEnabled': true,  // must be set to allow for model change listening
                    // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
                    'clickCreatingTool.archetypeNodeData': {text: 'new node', color: 'lightblue'},
                    model: new go.GraphLinksModel(
                        {
                            linkKeyProperty: 'key'  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
                        }),
                    // layout: new DemoForceDirectedLayout()  // have the comparer sort by numbers as well as letters
                    layout: $(go.LayeredDigraphLayout)
                    // layout: $(go.TreeLayout, { comparer: go.LayoutVertex.smartComparer }) // have the comparer sort by numbers as well as letters

                });

        // define a simple Node template
        diagram.nodeTemplate =
            $(go.Node, 'Auto',  // the Shape will go around the TextBlock
                new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
                $(go.Shape, 'RoundedRectangle',
                    {name: 'SHAPE', fill: 'white', strokeWidth: 0},
                    // Shape.fill is bound to Node.data.color
                    new go.Binding('fill', 'color')),
                $(go.TextBlock,
                    {margin: 8, editable: true},  // some room around the text
                    new go.Binding('text').makeTwoWay()
                )
            );
        // go.GenogramLayout
        //  diagram.layout = $(GenogramLayout, { direction: 90, layerSpacing: 30, columnSpacing: 10 })

        return diagram;
    }

    function handleModelChange(changes) {
        // alert('GoJS model changed!');
    }

    function diag() {
        // return groupId.nodesRemap !== null ? <ReactDiagram
        //     initDiagram={initDiagram}
        //     divClassName='diagram-component'
        //     nodeDataArray={groupId.nodesRemap}
        //     linkDataArray={groupId.arrowsRemap}
        //     onModelChange={handleModelChange}
        // /> : <div></div>;


        return (
            <div>
                <div>{groupId.nodesRemap}</div>
                <div>{groupId.arrowsRemap}</div>

            </div>
        )
    }

    return (
        <div>
            {diag()}
        </div>
    )

}

export default TraceDiagram