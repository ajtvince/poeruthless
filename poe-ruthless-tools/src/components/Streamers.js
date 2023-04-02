import React from 'react';
import './stylesheets/Streamers.css';
//list of streamers who stream ruthless
function Streamers() {
  let streamerInfoArray;
  return (
    <div className='pageContainer'>
      <div id='streamerList'>{streamerInfoArray}</div>
    </div>
  );
}

export default Streamers;