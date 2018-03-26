/* eslint-disable prefer-destructuring */
import React from 'react';
import { connect } from 'react-redux';
import './Editor.css';
import EditorCreateEditGist from './EditorCreateEditGist';
import EditorViewGist, { GistLoading } from './EditorViewGist';

class Editor extends React.Component {
  render() {
    const { editorMode, loading } = this.props;
    if (loading) return <GistLoading />;
    if (editorMode === 'add' || editorMode === 'edit') {
      return <EditorCreateEditGist />;
    }
    if (editorMode === 'view') {
      return <EditorViewGist />;
    }
    return null;
  }
}

const mapStateToProps = ({ gist: { editorMode, loading } }) => ({ editorMode, loading });

export default connect(mapStateToProps, {})(Editor);

