import './App.css';
import history from './history'
import { Router, Redirect, Switch, Route } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/index'
import {Provider} from 'react-redux'
import Auth from './components/Auth'
import Main from './components/Main'
import AddToken from './components/Balances/AddToken';
import ConfirmAddToken from './components/Balances/ConfirmAddToken';
import TokenTransfers from './components/Balances/TokenTransfers';
import fuse from './assets/fuse.png'


const store = createStore(rootReducer, applyMiddleware(thunk));

const AuthRoute = (props) => {
  if (!store.getState().account.loggedIn){
      return <Redirect to={{pathname: '/'}}/>
  }

  const { component, path } = props;

  return <Route to={path} component={component}/>
}

const routeToMain = () => {
  if (store.getState().account.accountAddress !== undefined){
      history.push(`/main?address=${store.getState().account.accountAddress}`)
  }
  else{
      history.push('/main')
  }
}


function App() {
  return (
    <Provider store = {store}>
        <div className="App">
            <Router history={history}>
            <img style={{cursor:'pointer'}} onClick={routeToMain} src={fuse} alt={"img"}></img>
              <Switch>
                <Route exact path= '/' component={Auth} />
                <AuthRoute path= '/main' component={Main}/> 
                <AuthRoute path= '/add-token' component={AddToken}/>
                <AuthRoute path= '/confirm-add-token' component={ConfirmAddToken}/>
                <AuthRoute path= '/token-transfers' component={TokenTransfers}/>  
              </Switch>
            </Router>
      </div>
    </Provider>

  );
}

export default App;
