/* eslint-disable no-unused-vars,no-use-before-define */
import React from 'react';
import { connect } from 'react-redux';

import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Main from './components/Main';
import Login from './components/Login';

class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute isLogged={this.props.isLogged} exact path="/" component={Main} />
          <Route path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const PrivateRoute = ({ component: Component, isLogged, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (isLogged ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      ))
    }
  />
);

const mapStateToProps = ({ auth: { isLogged } }) => ({ isLogged });
export default connect(mapStateToProps, {})(Router);

