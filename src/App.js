import './App.css';
import Login from './components/Login';
import Cookies from "js-cookie";
import Products from './components/Products';

function App() {
  return (
    <div className="App">
      {
        Cookies.get("token") ? <Products/> : <Login/>
      }
    </div>
  );
}

export default App;
