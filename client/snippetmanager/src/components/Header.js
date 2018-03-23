import React from 'react';
import { connect } from 'react-redux';
import { Navbar, NavDropdown, MenuItem, Nav, Image } from 'react-bootstrap';

import { logoutUser } from '../actions/authActions';
import { setGistAddMode } from '../actions/gistActions';

class Header extends React.Component {
  render() {
    return <div>
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            Snippet manager
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <MenuItem onClick={this.props.setGistAddMode}>
            Create new gist
          </MenuItem>
          <NavDropdown
            eventKey={3}
            title={this.props.username}
            id="basic-nav-dropdown"
          >
            <MenuItem eventKey={3.1} onClick={this.props.logoutUser}>
              Log out
            </MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    </div>;
  }
}

const mapStateToProps = ({ auth: { username, avatarUrl } }) => ({ username, avatarUrl });
export default connect(mapStateToProps, { logoutUser, setGistAddMode })(Header);

