import React from 'react';
import { useState, useEffect } from 'react';
import './stylesheets/LeagueContent.css';
//show league content that is in ruthless and info

export default function LeagueContent() {

  return(
    <div className='pageContainer'>
      <div className='pageName'>Ruthless Specific League Content</div>
      <div id='leagueContentContainer'>
        <div className='contentContainer'>
          <img className='contentImg' src='/media/phbg.jpg'></img><div className='contentDesc'>
            <div className='contentDescTitle'>Abyss League</div>
            <div className='contentDescInfo'>
              <p>Notable Ruthless Specific Changes:</p>
              <p>
                - Abyss is currently the only way to get cluster jewels in ruthless league.<br/>
                - Abyss also has this additional mechanic
              </p>
            </div></div>
        </div>
        <div className='contentContainer'>
          <img className='contentImg' src='/media/phbg.jpg'></img><div className='contentDesc'>
            <div className='contentDescTitle'>Abyss League</div>
            <div className='contentDescInfo'>
              <p>Notable Ruthless Specific Changes:</p>
              <p>
                - Abyss is currently the only way to get cluster jewels in ruthless league.<br/>
                - Abyss also has this additional mechanic
              </p>
            </div>
          </div>
        </div>
        <div className='contentContainer'>
          <img className='contentImg' src='/media/phbg.jpg'></img><div className='contentDesc'>
          <div className='contentDescTitle'>Abyss League</div>
            <div className='contentDescInfo'>
              <p>Notable Ruthless Specific Changes:</p>
              <p>
                - Abyss is currently the only way to get cluster jewels in ruthless league.<br/>
                - Abyss also has this additional mechanic
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}