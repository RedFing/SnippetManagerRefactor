import React from 'react';
import { connect } from 'react-redux';
import { setGistEditMode, deleteGist } from '../actions/gistActions';


class EditorViewGist extends React.Component {
  render() {
    const { gist } = this.props;
    if (!gist.selected) return <div>Select a gist </div>;
    return (

      <div id="main">
        <div className="col-md-12">
          <h1>{gist.gist.filename}</h1>
          <h3>Description</h3>
          <pre>{gist.gist.description}</pre>
          <h3>Content</h3>
          <pre>{gist.gist.content}</pre>
          <div>Created at: {gist.gist.createdAt}</div>
          <div className="btn-group" role="group">
            <button
              className="btn btn-primary"
              onClick={this.props.setGistEditMode}
            >Edit snippet
            </button>
            <button
              className="btn btn-danger"
              onClick={this.props.deleteGist}
            >Delete snippet
            </button>
          </div>
        </div>

      </div>
    );
  }
}


const mapStateToProps = ({ gist }) => ({ gist });

export default connect(mapStateToProps, { setGistEditMode, deleteGist })(EditorViewGist);

