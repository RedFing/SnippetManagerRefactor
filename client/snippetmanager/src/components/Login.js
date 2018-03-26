/* eslint-disable class-methods-use-this */
import React from 'react';
import GitHubLogin from 'react-github-login';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { GITHUB_CLIENT_ID, GITHUB_STATE_STRING } from '../secrets';
import { loginUser, loginUserFailed } from '../actions/authActions';

import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLoginFailure = this.onLoginFailure.bind(this);
  }

  onLoginSuccess(response) {
    this.props.loginUser(response);
  }
  onLoginFailure(error) {
    // TODO: handle error
  }
  render() {
    if (this.props.auth.isLogged) {
      return <Redirect to="/" />;
    }
    return (
      <div align="center" className="login-group container">
        <div className="glyphicon glyphicon-scissors" />
        <div className="login-title">Snippet manager</div>
        <div className="login-button">
          <GitHubLogin
            clientId={process.env.REACT_APP_GITHUB_CLIENT_ID}
            onSuccess={this.onLoginSuccess}
            onFailure={this.onLoginFailure}
            redirectUri={process.env.REACT_APP_GITHUB_REDIRECT_URI}
            scope="user:email, gist"
            state={GITHUB_STATE_STRING}
            className="btn btn-block btn-social btn-github"
            buttonText="Authenticate with github"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });
export default connect(mapStateToProps, { loginUser, loginUserFailed })(Login);
