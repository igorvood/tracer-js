import * as go from "gojs";

class DemoForceDirectedLayout extends go.ForceDirectedLayout {
    // Override the makeNetwork method to also initialize
    // ForceDirectedVertex.isFixed from the corresponding Node.isSelected.
    makeNetwork(coll) {
        // call base method for standard behavior
        const net = super.makeNetwork(coll);
        net.vertexes.each(vertex => {
            const node = vertex.node;
            if (node !== null) vertex.isFixed = node.isSelected;
        });
        return net;

    }
}

export default DemoForceDirectedLayout
// end DemoForceDirectedLayout class