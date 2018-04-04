/* eslint-disable prefer-destructuring, jsx-a11y/label-has-for */

import React from 'react';
import { connect } from 'react-redux';
import { cancelGistEditMode, addGist, editGist } from '../actions/gistActions';
import { EDITOR_MODE_ADD, EDITOR_MODE_EDIT } from '../constants';

class EditorCreateEditGist extends React.Component {
  constructor(props) {
    super(props);
    const { editorMode, gist: { content, filename, description } } = this.props.gist;
    if (editorMode === EDITOR_MODE_EDIT) {
      this.state = {
        content,
        filename,
        description,
        isPrivate: null,
      };
    } else {
      this.state = {
        content: '',
        filename: '',
        description: '',
        isPrivate: false,
      };
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleGistSubmit = this.handleGistSubmit.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }
  handleGistSubmit() {
    const { editorMode } = this.props.gist;
    const {
      filename, content, description, isPrivate,
    } = this.state;
    if (editorMode === EDITOR_MODE_ADD) {
      // create new gist
      this.props.addGist({
        filename, content, description, isPrivate,
      });
    } else {
      // edit the gist
      this.props.editGist({
        filename, content, description,
      });
    }
  }
  render() {
    const { editorMode } = this.props.gist;
    const HeaderText = editorMode === EDITOR_MODE_ADD
      ? <h1>Create a new gist: </h1>
      : <h1>Edit gist: </h1>;
    const submitButtonText = editorMode === EDITOR_MODE_ADD
      ? 'Create new gist'
      : 'Edit gist';

    return (
      <div>
        {HeaderText}
        <form className="col-sm-12">
          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              label="Filename"
              placeholder="Enter gist filename (including extension)"
              value={this.state.filename}
              name="filename"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="Enter description"
              value={this.state.description}
              name="description"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Enter content"
              value={this.state.content}
              name="content"
              onChange={this.handleInputChange}
            />
          </div>
          {editorMode === EDITOR_MODE_ADD &&

          <div className="form-group" >
            <div className="checkbox">
              <label><input
                type="checkbox"
                value={this.state.isPrivate}
                onChange={this.handleInputChange}
                name="isPrivate"
              />Make this a private gist
              </label>
            </div>
          </div>
              }
          <div className="btn-toolbar">
            <button
              type="button"
              onClick={this.handleGistSubmit}
              className="btn btn-primary"
            >
              {submitButtonText}
            </button>
            {editorMode === EDITOR_MODE_EDIT &&
            <button
              type="button"
              onClick={this.props.cancelGistEditMode}
              className="btn btn-primary"
            >
                Cancel edit
            </button>
              }
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ gist }) => ({ gist });

export default connect(
  mapStateToProps,
  { cancelGistEditMode, addGist, editGist },
)(EditorCreateEditGist);

