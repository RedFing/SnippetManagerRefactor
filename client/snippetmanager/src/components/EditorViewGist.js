import React from 'react';
import { connect } from 'react-redux';
import { setGistEditMode } from '../actions/gistActions';


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
          Created at: {gist.gist.createdAt}
        </div>
        <button onClick={this.props.setGistEditMode}>edit</button>
      </div>
    );
  }
}


const mapStateToProps = ({ gist }) => ({ gist });

export default connect(mapStateToProps, { setGistEditMode })(EditorViewGist);

