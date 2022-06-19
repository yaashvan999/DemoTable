import './App.css';
import ChildenCom from './childrenComp';
import Hoc from './hoc';

const Enhanced = Hoc(ChildenCom);
const App = () => {
    return (
        <div className="App">
            <h1 > Demo Post Table </h1>
            <Enhanced />
        </div>
    );
}

export default App;
