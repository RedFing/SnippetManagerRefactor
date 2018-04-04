import React from 'react';

import './SelectOrLoadingGist.css';

const GistLoading = () => (
  <div className="select-or-loading-gist" align="center">
    <div className="fa fa-spinner fa-spin" />
    <div>Loading</div>
  </div>
);

export default GistLoading;
