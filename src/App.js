import './App.css';
import GroupInput from './components/GroupInput'
import Uml from "./components/Uml";
import ReactDiagramMy from "./components/ReactDiagramMy";

function App() {
  return (
    <div className="Трассировка очередей kafka">
      <div><GroupInput/></div>
      <div><Uml/></div>
        {/*<div><GraphMy/></div>*/}
        {/*<div><ReactFlowMy/></div>*/}
        <div><ReactDiagramMy/></div>

    </div>
  );
}

export default App;
