import React from 'react';
import './Editor.css';

export default class Editor extends React.Component {
  render() {
    return (
      <div id="main">
        <div className="col-md-12">

          <h2>Fixed + Fluid Bootstrap Template with Off-canvas Sidebar</h2>
          <div className="row">
            <div className="col-md-12"><div className="well"><p>Shrink the browser width to make the sidebar collapse off canvase.</p></div></div>
          </div>
          <div className="row">
            <div className="col-md-4"><div className="well"><p>4 cols</p></div></div>
            <div className="col-md-4"><div className="well"><p>4 cols</p></div></div>
            <div className="col-md-4"><div className="well"><p>4 cols</p></div></div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-sm-6"><div className="well"><p>6 cols, 6 small cols</p></div></div>
            <div className="col-lg-6 col-sm-6"><div className="well"><p>6 cols, 6 small cols</p></div></div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-sm-6"><div className="well">4 cols, 6 small cols</div></div>
            <div className="col-lg-4 col-sm-6"><div className="well">4 cols, 6 small cols</div></div>
            <div className="col-lg-4 col-sm-12"><div className="well">4 cols, 12 small cols</div></div>
          </div>
        </div>
      </div>
    );
  }
}
