/* eslint-disable prefer-destructuring */
// props: editorMode: 'edit' | 'add'
import React from 'react';
import { FormGroup, ControlLabel, FormControl, Checkbox, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { cancelGistEditMode } from "../actions/gistActions";

class EditorCreateEditGist extends React.Component {
  constructor(props) {
    super(props);
    const { editorMode, gist } = this.props.gist;
    if (editorMode === 'edit') {
      this.state = {
        content: gist.content,
        filename: gist.filename,
        description: gist.description,
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
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }
  render() {
    const { editorMode } = this.props.gist;
    const HeaderText = editorMode === 'add'
      ? <h1>Create a new gist: </h1>
      : <h1>Edit gist: </h1>;
    const submitButtonText = editorMode === 'add'
      ? 'Create new gist' : 'Edit gist';

    return (
      <div id="main">
        <div className="col-md-12">
          {HeaderText}
          <form>
            <FormGroup controlId="gistName">
              <ControlLabel>Filename</ControlLabel>
              <FormControl
                type="text"
                label="Filename"
                placeholder="Enter gist filename (including extension)"
                value={this.state.filename}
                name="filename"
                onChange={this.handleInputChange}
              />
              <FormControl
                type="textarea"
                label="Description"
                placeholder="Enter description"
                value={this.state.description}
                name="description"
                onChange={this.handleInputChange}
              />
              <FormControl
                type="textarea"
                label="Content"
                placeholder="Enter content"
                value={this.state.content}
                name="content"
                onChange={this.handleInputChange}
              />
              {editorMode === 'add' &&

              <Checkbox
                checked={this.state.isPrivate}
                onChange={this.handleInputChange}
                name="isPrivate"
              >
                Is this a private gist?
              </Checkbox>

              }
              <Button>{submitButtonText}</Button>
              {editorMode === 'edit' &&
              <Button onClick={this.props.cancelGistEditMode}>Cancel edit</Button>
              }
            </FormGroup>
          </form>
        </div>
      </div>

    );
  }
}

const mapStateToProps = ({ gist }) => ({ gist });

export default connect(mapStateToProps, { cancelGistEditMode })(EditorCreateEditGist);
