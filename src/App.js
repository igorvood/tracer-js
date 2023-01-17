import GroupInput from './components/GroupInput'
import Uml from "./components/Uml";
import ReactDiagramMy from "./components/ReactDiagramMy";
import {connect} from "react-redux";
import {rootReducer} from "./redux/rootReducer";
import TraceDiagram from "./components/TraceDiagram";

function App() {
  return (
    <div className="Трассировка очередей kafka">
      <div><GroupInput/></div>
      {/*<div><Uml/></div>*/}
        {/*<div><GraphMy/></div>*/}
        {/*<div><ReactFlowMy/></div>*/}
        <div><ReactDiagramMy/></div>
        {/*<div><TraceDiagram/></div>*/}


    </div>
  );
}
export default connect()(App )

