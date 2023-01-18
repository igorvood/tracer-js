import React from "react";
import {IArrow, IGraph, INode} from "../models/models";
import {ReactDiagram} from "gojs-react";
import * as go from "gojs";


interface ServiceKafkaGraphProps {
    graph: IGraph
}

interface IGraphNode {
    key: string,
    text: string,
    color: string
}


export function ServiceKafkaGraph({ graph }: ServiceKafkaGraphProps) {

    const initGraph = () => {
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

    const nodesRemap= (nodes: INode[]) =>{
        return nodes.map(function (n) {
            let nodeColor;
            let nodeText;

            if (n.typeNode === 'TOPIC')
                if (n.time === null) {
                    nodeText = n.name
                    nodeColor = 'pink'
                } else {
                    nodeText = n.name + "\ntime:" + n.time + "\nID:" + n.id + "\nUUID:" + n.uid
                    nodeColor = 'lightgreen'
                }
            else {
                nodeText = n.name
                nodeColor = 'lightblue'
            }
            const modal: IGraphNode = {
                key: n.index.toString(),
                text: nodeText,
                color: nodeColor
            };

            return modal

        })
    }

    const arrowsRemap = (arrows: IArrow[]): { from: number; to: number; key: number }[] =>{
        return arrows.map(function (a) {
            return {
                key: a.index,
                from: a.from,
                to: a.to
            }
        });
    }




    return (
    <div className="border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all diagram-component">
        ...
        <ReactDiagram
            initDiagram={initGraph}
            divClassName='diagram-component'
            nodeDataArray={nodesRemap(graph.nodes)}
            linkDataArray={arrowsRemap(graph.arrows)}
            // onModelChange={this.handleModelChange}
        />
        ...
    </div>
    )
}