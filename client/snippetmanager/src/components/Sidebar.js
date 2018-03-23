import React from 'react';
import { connect } from 'react-redux';
import { loadGists } from '../actions/gistsActions';
import { loadGist } from '../actions/gistActions';

import './Sidebar.css';

class Sidebar extends React.Component {
  componentDidMount() {
    this.props.loadGists();
  }
  render() {
    return (
      <div id="sidebar">
        <div className="col-md-12">
          <h3>Sidebar (fixed)</h3>
          <ul className="nav nav-pills nav-stacked">
            {this.props.gists.map(el => <GistItemSidebar key={el.id} gistInfo={el} loadGist={this.props.loadGist} />)}
          </ul>
        </div>

      </div>
    );
  }
}

const mapStateToProps = ({ gists }) => ({ gists: gists.gists });

export default connect(mapStateToProps, { loadGists, loadGist })(Sidebar);

const GistItemSidebar = ({ gistInfo, loadGist }) => (
  <li onClick={() => loadGist(gistInfo.id)}>
    <p>Name: {gistInfo.name}</p>
    <p>Description: {gistInfo.description}</p>
    <p>Created: {gistInfo.createdAt}</p>
  </li>
);
