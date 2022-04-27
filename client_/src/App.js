
import Menu from './menu/Menu';
import Home from './Home/Home';
import {BrowserRouter as Router, Switch,Route} from "react-router-dom"
import Form from './formMoeda/FormMoeda';
import Post from './post/Post';

function App() {
  return (
    <div className="App">
            <Router>
                  <Menu />
                  <Switch>
                          <Route exact path="/"   component={Home}/>
                          <Route path="/register" component={Form} />
                          <Route path="/update" component={Form} />
                  </Switch>
              </Router>
      </div>
  )
}

export default App;

