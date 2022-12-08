import React from 'react';
import Viva from "vivagraphjs";



class GraphMy extends React.Component {


    render() {
        return       <div onLoad={this.main()}>
            GraphMy
        </div>
    }

    gr() {
        console.log("gr_GraphMy")
        let graph = Viva.Graph.graph();
        graph.addNode(1);
        graph.addNode(2);
        graph.addLink(1, 2);


        let renderer
            = Viva.Graph.View.renderer(graph);
        renderer.run()
    }

    main () {
        console.log("main_GraphMy")
        // This demo shows how to create a directional arrow in SVG renderer.
        // Though it might seem wordy it's due to SVG specific operations.
        // The library has minimal SVG manipulation support.
        // Maybe in future some of the following technniques will become part
        // of the library itself...
        var graph = Viva.Graph.graph();
        var graphics = Viva.Graph.View.svgGraphics(),
            nodeSize = 100;
        graphics.node(function(node) {
            return Viva.Graph.svg('image')
                .attr('width', nodeSize)
                .attr('height', nodeSize)
                .link('https://secure.gravatar.com/avatar/' + node.data);
        }).placeNode(function(nodeUI, pos) {
            nodeUI.attr('x', pos.x - nodeSize / 2).attr('y', pos.y - nodeSize / 2);
        });
        // To render an arrow we have to address two problems:
        //  1. Links should start/stop at node's bounding box, not at the node center.
        //  2. Render an arrow shape at the end of the link.
        // Rendering arrow shape is achieved by using SVG markers, part of the SVG
        // standard: http://www.w3.org/TR/SVG/painting.html#Markers
        var createMarker = function(id) {
                return Viva.Graph.svg('marker')
                    .attr('id', id)
                    .attr('viewBox', "0 0 10 10")
                    .attr('refX', "10")
                    .attr('refY', "5")
                    .attr('markerUnits', "strokeWidth")
                    .attr('markerWidth', "10")
                    .attr('markerHeight', "5")
                    .attr('orient', "auto");
            },
            marker = createMarker('Triangle');
        marker.append('path').attr('d', 'M 0 0 L 10 5 L 0 10 z');
        // Marker should be defined only once in <defs> child element of root <svg> element:
        var defs = graphics.getSvgRoot().append('defs');
        defs.append(marker);
        var geom = Viva.Graph.geom();
        graphics.link(function(link){
            // Notice the Triangle marker-end attribe:
            return Viva.Graph.svg('path')
                .attr('stroke', 'gray')
                .attr('marker-end', 'url(#Triangle)');
        }).placeLink(function(linkUI, fromPos, toPos) {
            // Here we should take care about
            //  "Links should start/stop at node's bounding box, not at the node center."
            // For rectangular nodes Viva.Graph.geom() provides efficient way to find
            // an intersection point between segment and rectangle
            var toNodeSize = nodeSize,
                fromNodeSize = nodeSize;
            var from = geom.intersectRect(
                    // rectangle:
                    fromPos.x - fromNodeSize / 2, // left
                    fromPos.y - fromNodeSize / 2, // top
                    fromPos.x + fromNodeSize / 2, // right
                    fromPos.y + fromNodeSize / 2, // bottom
                    // segment:
                    fromPos.x, fromPos.y, toPos.x, toPos.y)
                || fromPos; // if no intersection found - return center of the node
            var to = geom.intersectRect(
                    // rectangle:
                    toPos.x - toNodeSize / 2, // left
                    toPos.y - toNodeSize / 2, // top
                    toPos.x + toNodeSize / 2, // right
                    toPos.y + toNodeSize / 2, // bottom
                    // segment:
                    toPos.x, toPos.y, fromPos.x, fromPos.y)
                || toPos; // if no intersection found - return center of the node
            var data = 'M' + from.x + ',' + from.y +
                'L' + to.x + ',' + to.y;
            linkUI.attr("d", data);
        });
        // Finally we add something to the graph:
        graph.addNode('anvaka', '91bad8ceeec43ae303790f8fe238164b');
        graph.addNode('indexzero', 'd43e8ea63b61e7669ded5b9d3c2e980f');
        graph.addLink('anvaka', 'indexzero');
        // All is ready. Render the graph:
        var renderer = Viva.Graph.View.renderer(graph, {
            graphics : graphics
        });

        renderer.run();
    }

}

export default GraphMy