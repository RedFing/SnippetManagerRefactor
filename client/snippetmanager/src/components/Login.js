/* eslint-disable no-console,class-methods-use-this */
import React from 'react';
import GitHubLogin from 'react-github-login';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { GITHUB_CLIENT_ID, GITHUB_STATE_STRING } from '../secrets';
import { loginUser, loginUserFailed } from '../actions/authActions';

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
    console.log(error);
  }
  render() {
    if (this.props.auth.isLogged) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <div>LOGIN</div>
        <div>
          <GitHubLogin
            clientId={GITHUB_CLIENT_ID}
            onSuccess={this.onLoginSuccess}
            onFailure={this.onLoginFailure}
            redirectUri="http://localhost:3000/login"
            scope="user:email, gist"
            state={GITHUB_STATE_STRING}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });
export default connect(mapStateToProps, { loginUser, loginUserFailed })(Login);
