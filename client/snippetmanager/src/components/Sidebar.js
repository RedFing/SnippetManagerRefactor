/* eslint-disable no-shadow, jsx-a11y/no-noninteractive-element-interactions,
 jsx-a11y/click-events-have-key-events
*/
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
          <h3 className="sidebar-title">My snippets</h3>
          <ul className="nav nav-pills nav-stacked">
            {this.props.gists.map(el =>
              (<GistItemSidebar
                key={el.id}
                gistInfo={el}
                loadGist={this.props.loadGist}
                active={el.id === this.props.gist.id}
              />))}
          </ul>
          { this.props.isRemaining &&
            <div align="center">
              <button
                className="btn btn-primary"
                onClick={this.props.loadGists}
              >Load more
              </button>
            </div>
            }
        </div>

      </div>
    );
  }
}


const GistItemSidebar = ({ gistInfo, loadGist, active }) => (
  <li className={active ? 'active' : ''} style={{ marginBottom: '10px', borderBottom: '2px solid #E8E8E8' }} onClick={() => loadGist(gistInfo.id)}>
    <strong>{gistInfo.name}</strong>
    <p><span className="glyphicon glyphicon-info-sign" />{gistInfo.description}</p>
    <small><span className="glyphicon glyphicon-time" />{' '}{gistInfo.createdAt}</small>
  </li>
);

const mapStateToProps = ({ gists, gist }) =>
  ({ gists: gists.gists, gist: gist.gist, isRemaming: gists.isRemaining });

export default connect(mapStateToProps, { loadGists, loadGist })(Sidebar);
