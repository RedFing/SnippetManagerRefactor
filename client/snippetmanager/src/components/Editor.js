import React from 'react';
import { connect } from 'react-redux';

import './Editor.css';

class Editor extends React.Component {
  render() {
    return (
      <div id="main">
        <div className="col-md-12">
          <h2>Editor</h2>
          <pre>{JSON.stringify(this.props.gist, null, 2)}</pre>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ gist }) => ({ gist });

export default connect(mapStateToProps, {})(Editor);

