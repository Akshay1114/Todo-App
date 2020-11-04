import React, { Component } from 'react'
import './App.css';
import Form from './components/Form'
import Register from './components/Register';
import Login from './components/Login'
import history from './components/History'
import {BrowserRouter as Router , Switch,Route} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'



export default class App extends Component {
  render() {
    return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Login exact path = "/" component={Login} />
          <ProtectedRoute path="/form" component={Form} />
          <Route path="/register" component={Register} />
        </Switch>
     </Router>
    </div>
    )
  }
}


