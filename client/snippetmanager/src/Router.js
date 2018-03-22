/* eslint-disable no-unused-vars,no-use-before-define */
import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';

export default class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const Main = props => (
  <div>Main</div>
);

const Login = props => (
  <div>Login</div>
);
