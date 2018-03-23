import React from 'react';
import './Sidebar.css';

export default class Sidebar extends React.Component {
  render() {
    return (
      <div id="sidebar" className="sidebar-offcanvas">
        <div className="col-md-12">
          <h3>Sidebar (fixed)</h3>
          <ul className="nav nav-pills nav-stacked">
            <li className="active">Section</li>
            <li>Section</li>
            <li>Section</li>
            <li>Section</li>
            <li>Section</li>
            <li>Section</li>
            <li>Section</li>
            <li>Section</li>
            <li>Section</li>
            <li>Section</li>
          </ul>
        </div>
      </div>
    );
  }
}
