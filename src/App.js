import logo from './logo.svg';
import './App.css';
import GroupInput from './components/GroupInput'
import Uml from "./components/Uml";

function App() {
  return (
    <div className="Трассировка очередей kafka">
      <div><GroupInput/></div>
      <div><Uml/></div>
      {/*<table>*/}
      {/*  <tr>*/}
      {/*    <div><GroupInput/></div>*/}
      {/*  </tr>*/}
      {/*  <tr>*/}
      {/*    here draw uml*/}
      {/*  </tr>*/}

      {/*</table>*/}
    </div>
  );
}

export default App;
