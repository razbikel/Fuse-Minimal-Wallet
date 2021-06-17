import './App.css';
import history from './history'
import { Router, Redirect, Switch, Route } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/index'
import {Provider} from 'react-redux'
import Auth from './components/Auth'
import Main from './components/Main'


const store = createStore(rootReducer, applyMiddleware(thunk));

const AuthRoute = (props) => {
  if (!store.getState().account.loggedIn){
      return <Redirect to={{pathname: '/'}}/>
  }

  const { component, path } = props;

  return <Route to={path} component={component}/>
}


function App() {
  return (
    <Provider store = {store}>
        <div className="App">
          <h1>Fuse Wallet</h1>
          <Router history={history}>
            <Switch>
              <Route exact path= '/' component={Auth} />
              <AuthRoute path= '/Main' component={Main}/> 
            </Switch>
          </Router>
      </div>
    </Provider>

  );
}

export default App;
