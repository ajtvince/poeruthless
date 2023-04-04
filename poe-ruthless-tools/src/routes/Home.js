import React from 'react';
import './stylesheets/Home.css';
//show current race leader
//show news posts related to ruthless

export default function Home() {
  return (
    <div className='pageContainer'>
      <div className='pageName'>PoERuthless</div>
      <div id='homeContainer'>
        <p id='homeDesc'>
          PoERuthless.com is a website that collects ruthless specific information and consolidates it into an easily readable format, as well as provides a tool to easily determine which mule accounts you will need to level to aqcuire all quest reward gems you desire. If you have any suggestions for tools or information to be put onto this site, or run into any bugs/errors, please create an issue on the GitHub page for this project: <a href='https://github.com/ajtvince/poeruthless/issues'>GitHub</a>
        </p>
        <div id='top5CurrentLeague'>
          <div>list current league leaders here in each class</div>
        </div>
      </div>
    </div>
  );
}

