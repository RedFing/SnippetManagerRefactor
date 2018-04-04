import React from 'react';
import { connect } from 'react-redux';
import { loadGists } from '../actions/gistsActions';
import { loadGist } from '../actions/gistActions';
import SidebarGistItem from './SidebarGistItem';
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
            {this.props.gists.length > 0 && this.props.gists.map(el =>
              (<SidebarGistItem
                key={el.id}
                gistInfo={el}
                loadGist={this.props.loadGist}
                active={el.id === this.props.gist.id}
              />))}
          </ul>
          {this.props.isRemaining &&
            <div align="center">
              <button
                className="btn btn-primary"
                onClick={this.props.loadGists}
              >Load more
              </button>
            </div>
          }
          {(!this.props.gists.length && !this.props.gistsLoading) &&
          <div style={{ textAlign: 'center' }}>No snippets found!</div>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ gists, gist }) =>
  ({
    gists: gists.gists,
    gist: gist.gist,
    isRemaming: gists.isRemaining,
    gistsLoading: gists.isFetching,
  });

export default connect(mapStateToProps, { loadGists, loadGist })(Sidebar);
