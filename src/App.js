import './App.css';
import createBrowserHistory from 'history/createBrowserHistory'
import { Router, Redirect, Switch, Route } from 'react-router'
import Auth from './components/Auth'
import Main from './components/Main'

const history = createBrowserHistory();

let loggedIn = false;

const AuthRoute = (props) => {
  if (!loggedIn){
      return <Redirect to={{pathname: '/'}}/>
  }

  const { component, path } = props;

  return <Route to={path} component={component}/>
}


function App() {
  return (
    <div className="App">
        <h1>Fuse Wallet</h1>
        <Router history={history}>
          <Switch>
            <Route exact path= '/' component={Auth} />
            <AuthRoute path= '/Main' component={Main}/> 
          </Switch>
        </Router>
    </div>
  );
}

export default App;
