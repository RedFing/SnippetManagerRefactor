import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Editor from './Editor';

export default class Main extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Sidebar />
        <Editor />
      </div>
    );
  }
}
