import React from 'react';
import { connect } from 'react-redux';
import { setGistEditMode, deleteGist } from '../actions/gistActions';


class EditorViewGist extends React.Component {
  render() {
    const { gist } = this.props;
    return (
      <div>
        <h1>{gist.gist.filename}</h1>
        <h3>Description</h3>
        <pre>{gist.gist.description}</pre>
        <h3>Content</h3>
        <pre>{gist.gist.content}</pre>
        <div>Created at: { new Date(gist.gist.createdAt).toLocaleString()}</div>
        <div className="btn-toolbar" >
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
    );
  }
}


const mapStateToProps = ({ gist }) => ({ gist });

export default connect(mapStateToProps, { setGistEditMode, deleteGist })(EditorViewGist);

