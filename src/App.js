import logo from './logo.svg';
import './App.css';
import GroupInput from './components/GroupInput'
import Uml from "./components/Uml";
import GraphMy from "./components/GraphMy";
import ReactFlowMy from "./components/ReactFlowMy"

function App() {
  return (
    <div className="Трассировка очередей kafka">
      <div><GroupInput/></div>
      <div><Uml/></div>
        {/*<div><GraphMy/></div>*/}
        {/*<div><ReactFlowMy/></div>*/}

    </div>
  );
}

export default App;
