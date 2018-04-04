import React from 'react';
import { connect } from 'react-redux';

import EditorCreateEditGist from './EditorCreateEditGist';
import EditorViewGist from './EditorViewGist';
import NoGistSelected from './NoGistSelected';
import GistLoading from './GistLoading';

import { EDITOR_MODE_ADD, EDITOR_MODE_EDIT, EDITOR_MODE_VIEW } from '../constants';

import './Editor.css';

class Editor extends React.Component {
  render() {
    const { editorMode, loading, selected } = this.props;
    if (loading) return <GistLoading />;
    if (editorMode === EDITOR_MODE_ADD || editorMode === EDITOR_MODE_EDIT) {
      return <EditorCreateEditGist />;
    }
    if (!selected) return <NoGistSelected />;
    if (editorMode === EDITOR_MODE_VIEW) {
      return <EditorViewGist />;
    }
    return null;
  }
}

const mapStateToProps = ({ gist: { editorMode, loading, selected } }) =>
  ({ editorMode, loading, selected });

export default connect(mapStateToProps, {})(Editor);

