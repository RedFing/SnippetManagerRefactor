import React from 'react';
import { ToastContainer } from 'react-toastify';

import Header from './Header';
import Sidebar from './Sidebar';
import Editor from './Editor';

export default class Main extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Sidebar />
        <EditorContainer>
          <Editor />
        </EditorContainer>
        <ToastContainer hideProgressBar />
      </div>
    );
  }
}

// TODO: extract to separate file
const EditorContainer = ({ children }) => (
  <div id="main">
    <div className="col-md-12">
      {children}
    </div>
  </div>
);
