import React from 'react';
import ReactFlow from 'react-flow-renderer';

const elements = [
    { id: '1', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
    { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
    { id: 'e1-2', source: '1', target: '2', animated: true },
];

const flowStyles = { height: 500 };

const BasicFlow = () => <ReactFlow elements={elements} style={flowStyles} />;


class ReactFlowMy extends React.Component {
    render() {
        return       <div >
            ReactFlow
            <ReactFlow elements={elements} style={flowStyles} />
        </div>
    }

}
export default ReactFlowMy
