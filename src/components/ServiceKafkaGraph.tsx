import React from "react";
import {IArrow, IGraph, INode} from "../models/models";
import {ReactDiagram} from "gojs-react";
import * as go from "gojs";


interface IServiceKafkaGraphProps {
    graph: IGraph
}

interface IGraphNode {
    key: string,
    text: string,
    color: string,
    toolTip: string,
}


export function ServiceKafkaGraph({graph}: IServiceKafkaGraphProps) {

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

                },
                {
                    isReadOnly: false,
                    allowHorizontalScroll: true,
                    allowVerticalScroll: true,
                    allowZoom: false,
                    allowSelect: true,
                    // autoScale: Diagram.Uniform,
                    // contentAlignment: go.Spot.LeftCenter

                });


        // const myDiagram = $(go.Diagram, diagramId, {
        //     initialContentAlignment: go.Spot.LeftCenter,
        //     layout: $(go.TreeLayout, {
        //         angle: 0,
        //         arrangement: go.TreeLayout.ArrangementVertical,
        //         treeStyle: go.TreeLayout.StyleLayered
        //     }),
        //     isReadOnly: false,
        //     allowHorizontalScroll: true,
        //     allowVerticalScroll: true,
        //     allowZoom: false,
        //     allowSelect: true,
        //     autoScale: Diagram.Uniform,
        //     contentAlignment: go.Spot.LeftCenter
        // });

        function tooltipTextConverter({toolTip}: IGraphNode) {
            var str = "some tool";
            // str += "Born: " + person.birthYear;
            // if (person.deathYear !== undefined) str += "\nDied: " + person.deathYear;
            // if (person.reign !== undefined) str += "\nReign: " + person.reign;
            return toolTip;
        }

        // define tooltips for nodes
        var tooltiptemplate =
            $("ToolTip",
                {"Border.fill": "whitesmoke", "Border.stroke": "black"},
                $(go.TextBlock,
                    {
                        font: "bold 8pt Helvetica, bold Arial, sans-serif",
                        wrap: go.TextBlock.WrapFit,
                        margin: 5
                    },
                    new go.Binding("text", "", tooltipTextConverter))
            );
        // define a simple Node template
        diagram.nodeTemplate =
            $(go.Node, 'Auto',  // the Shape will go around the TextBlock
                {deletable: false, toolTip: tooltiptemplate},
                new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
                $(go.Shape, 'RoundedRectangle',
                    {name: 'SHAPE', fill: 'white', strokeWidth: 0},
                    // Shape.fill is bound to Node.data.color
                    new go.Binding('fill', 'color')),
                $(go.TextBlock,
                    {margin: 8, editable: true},  // some room around the text
                    // new go.Binding('text','', tooltipTextConverter).makeTwoWay()
                    new go.Binding('text').makeTwoWay()
                )
            );
        // go.GenogramLayout
        //  diagram.layout = $(GenogramLayout, { direction: 90, layerSpacing: 30, columnSpacing: 10 })

        return diagram;
    }

    const nodesRemap = (nodes: INode[]) => {
        return nodes.map(function (n) {
            let nodeColor;
            let nodeText;
            let toolTip = "No data";

            if (n.typeNode === 'TOPIC')
                if (n.time === null) {
                    nodeText = n.name
                    nodeColor = 'pink'
                } else {

                    if (n.messageText) {
                        try {
                            toolTip = JSON.stringify(JSON.parse(n.messageText), null, 2)
                        } catch (e) {
                            toolTip = n.messageText
                        }
                        console.log('toolTip %', JSON.stringify(toolTip, null, 2))
                    } else toolTip = n.messageText || "empty data"


                    nodeText = n.name + "\ntime:" + n.time + "\nID:" + n.id + "\nUUID:" + n.uid
                    nodeColor = 'lightgreen'
                    // toolTip = n.messageText || "empty data"
                }
            else {
                nodeText = n.name
                nodeColor = 'lightblue'
            }
            const modal: IGraphNode = {
                key: n.index.toString(),
                text: nodeText,
                color: nodeColor,
                toolTip: toolTip
            };

            return modal

        })
    }

    const arrowsRemap = (arrows: IArrow[]): { from: number; to: number; key: number }[] => {
        return arrows.map(function (a) {
            return {
                key: a.index,
                from: a.from,
                to: a.to
            }
        });
    }


    return (

        // <div className="border py-3 px-5 w-full rounded mb-2 bg-gray-500 flex-grow: 3">

        <ReactDiagram
            initDiagram={initGraph}
            divClassName='border py-3 px-5 rounded mb-2 hover:shadow-md transition-all w-full h-screen'
            nodeDataArray={nodesRemap(graph.nodes)}
            linkDataArray={arrowsRemap(graph.arrows)}
            // onModelChange={this.handleModelChange}
        />

        // </div>
    )
}

// .diagram-component {
//     width: 3000px;
//     height: 1000px;
//
//     /*min-width: 1000px;*/
//     /*margin-top: 2px;*/
//     /*margin-bottom: 2px;*/
//
//     border: solid 1px black;
//     background-color: white;
// }