import './App.css';
import { BrowserRouter,Route,Switch} from "react-router-dom";
import Landing from "./components/Landing";
import Home from"./components/Home"
import DogDetail from "./components/DogDetail"
import {CreateDog} from "./components/CreateDog"
import NotFound from './components/NotFound';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
    <Route exact path = "/" component = {Landing}/>
    <Route exact path = "/home" component = {Home}/>
    <Route exact path ="/CreateDog" component={CreateDog}/>
    <Route exact path = "/dogs/:id" component={DogDetail}/>

    <Route component={NotFound}/>
    </Switch>
        
    </div>
    <Footer></Footer>
    </BrowserRouter>
    
  );
}

export default App;
