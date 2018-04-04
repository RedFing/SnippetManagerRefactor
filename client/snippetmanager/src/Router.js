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
import { ROUTER_LOGIN_PATH, ROTUER_MAIN_PATH } from './constants';

class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute
            exact
            isLogged={this.props.isLogged}
            path={ROTUER_MAIN_PATH}
            component={Main}
          />
          <Route
            path={ROUTER_LOGIN_PATH}
            component={Login}
          />
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
        <Redirect to={ROUTER_LOGIN_PATH} />
      ))
    }
  />
);

const mapStateToProps = ({ auth: { isLogged } }) => ({ isLogged });
export default connect(mapStateToProps, {})(Router);

