import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './features/User/Login';
import Dashboard from './features/User/Dashboard';
import { PrivateRoute } from './helpers/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact component={Login} path="/login" />
          <PrivateRoute exact component={Dashboard} path="/" />
          {/* PrivateRoute  needs to be logged in */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
