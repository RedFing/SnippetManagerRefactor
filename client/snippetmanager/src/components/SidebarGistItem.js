/* eslint-disable no-shadow, jsx-a11y/no-noninteractive-element-interactions,
 jsx-a11y/click-events-have-key-events
*/

import React from 'react';

const SidebarGistItem = ({ gistInfo, loadGist, active }) => (
  <li
    className={active ? 'active' : ''}
    style={{ marginBottom: '10px', borderBottom: '2px solid #E8E8E8' }}
    onClick={() => loadGist(gistInfo.id)}
  >
    <strong>{gistInfo.name}</strong>
    <p><span className="glyphicon glyphicon-info-sign" />{' '}{gistInfo.description}</p>
    <small><span className="glyphicon glyphicon-time" />{' '}{gistInfo.createdAt}</small>
  </li>
);

export default SidebarGistItem;
