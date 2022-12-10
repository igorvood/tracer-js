import React from "react";
import {ReactDiagram} from "gojs-react";
import * as go from "gojs";
import requestGraph, {baseUrl} from "./RequestGraph";
import axios from "axios";
import DemoForceDirectedLayout from "./DemoForceDirectedLayout";


class ReactDiagramMy extends React.Component{

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
                    // console.log(resData.data)
                    this.setState({nodes: resData.data.nodes})
                    this.setState({arrows: resData.data.arrows})
                }
            )

          this.state ={
            nodes: [],
            arrows: [],
            nodesG: [],
            arrowsG: [],

        }
        // this.getGr()

    }

     initDiagram() {
        const $ = go.GraphObject.make;
        // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
        const diagram =
            $(go.Diagram,
                {
                    'undoManager.isEnabled': true,  // must be set to allow for model change listening
                    // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
                    'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'lightblue' },
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
                    { name: 'SHAPE', fill: 'white', strokeWidth: 0 },
                    // Shape.fill is bound to Node.data.color
                    new go.Binding('fill', 'color')),
                $(go.TextBlock,
                    { margin: 8, editable: true },  // some room around the text
                    new go.Binding('text').makeTwoWay()
                )
            );
        // go.GenogramLayout
        //  diagram.layout = $(GenogramLayout, { direction: 90, layerSpacing: 30, columnSpacing: 10 })

        return diagram;
    }

    handleModelChange(changes) {
        // alert('GoJS model changed!');
    }

    render() {
        console.log(this.state.nodes)
        let nodeColor;
        let nodeText;
        let no = this.state.nodes.map (function (n){
            if (n.typeNode === 'TOPIC')
                if(n.time === null) {
                    nodeText = n.name
                    nodeColor = 'pink'
                }
                else {
                    nodeText = n.name+"\ntime:"+n.time
                    nodeColor = 'lightgreen'
                }
            else {
                nodeText = n.name
                nodeColor = 'lightblue'
            }
            return {
                key: n.index,
                text: nodeText,
                color: nodeColor
            }
        });

        let arrows = this.state.arrows.map (function (a){
            return {
                key: a.index,
                from: a.from,
                to: a.to
            }
        });

        // { key: 0, text: 'Alpha_asdlkhhj_asdkjh_\nasdsadsad', color: 'lightblue'},
        // { key: 1, text: 'Beta', color: 'orange'},
        // { key: 2, text: 'Gamma', color: 'lightgreen'},
        // { key: 3, text: 'Delta', color: 'pink' }



        return    <div>
            ...
            <ReactDiagram
                initDiagram={this.initDiagram}
                divClassName='diagram-component'
                nodeDataArray={no}
                linkDataArray={arrows}
                onModelChange={this.handleModelChange}
            />
            ...
        </div>

    }


}
export default ReactDiagramMy