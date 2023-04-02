import React from 'react';
import './stylesheets/Navigation.css';

function Navigation() {
  return (
    <div id='nav'>
      <div id='navSubmenu'>
        <div className='navItem'><a href='/'>Home</a></div>
        <div className='navItem'><a href='/skillgems'>Skill Gems</a></div>
        <div className='navItem'><a href='/leaguecontent'>League Content</a></div>
        <div className='navItem'><a href='/recipes'>Recipes</a></div>
        <div className='navItem'><a href='/streamers'>Ruthless Streamers</a></div>
      </div>
    </div>
  );
}

export default Navigation;