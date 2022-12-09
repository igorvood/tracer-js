import React from "react";
import {ReactDiagram} from "gojs-react";
import * as go from "gojs";
import requestGraph, {baseUrl} from "./RequestGraph";


class ReactDiagramMy extends React.Component{

    constructor(props) {
        super(props);

        this.state ={
            nodes: [],
                arrows: [],

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
                        })
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

        return diagram;
    }

    handleModelChange(changes) {
        // alert('GoJS model changed!');
    }

    getGr() {
        let jsObj = JSON.parse(requestGraph(baseUrl));

        let properties = "string".split(', ');
        const obj = {};
        let map = properties.map(function(property) {
            let tup = property.split(':');
            obj[tup[0]] = tup[1];
            return tup
        });

        let nodes = jsObj.nodes.map (function (n){
            return [{
                key: n.index,
                text: n.name,
                color: 'lightblue'
            }]
        });

        let arrows = jsObj.arrows.map (function (a){
            return [{
                key: a.index,
                from: a.from,
                to: a.to
            }]
        });

        this.setState({nodes: nodes})
        this.setState({arrows: arrows})

        }


    render() {
        return    <div>
            ...
            <ReactDiagram
                initDiagram={this.initDiagram}
                divClassName='diagram-component'
                nodeDataArray={[
                    { key: 0, text: 'Alpha_asdlkhhj_asdkjh_\nasdsadsad', color: 'lightblue'},
                    { key: 1, text: 'Beta', color: 'orange'},
                    { key: 2, text: 'Gamma', color: 'lightgreen'},
                    { key: 3, text: 'Delta', color: 'pink' }
                ]}
                linkDataArray={[

                    { key: -2, from: 0, to: 2 },
                    { key: -3, from: 1, to: 1 },
                    { key: -4, from: 2, to: 3 },
                    { key: -6, from: 1, to: 3 },
                    { key: -1, from: 0, to: 1 },
                    { key: -5, from: 3, to: 0 }
                ]}
                onModelChange={this.handleModelChange}
            />
            ...
        </div>

    }


}
export default ReactDiagramMy