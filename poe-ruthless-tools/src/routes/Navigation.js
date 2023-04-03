import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './stylesheets/Navigation.css';

function Navigation() {
  
  return (<div>
    <div id='nav'>
      <div onClick={() => openMobileNav()} id='mobileNavBtn'>
        <div id='mobileNavBar1'></div>
        <div id='mobileNavBar2'></div>
        <div id='mobileNavBar3'></div>
      </div>
      <div id='navSubmenu'>
        <div className='navItem'><Link to='/home' onClick={() => closeMobileNav()}>Home</Link></div>
        <div className='navItem'><Link to='/skillgems' onClick={() => closeMobileNav()}>Skill Gems</Link></div>
        <div className='navItem'><Link to='/leaguecontent' onClick={() => closeMobileNav()}>League Content</Link></div>
        <div className='navItem'><Link to='/recipes' onClick={() => closeMobileNav()}>Recipes</Link></div>
        <div className='navItem'><Link to='/streamers' onClick={() => closeMobileNav()}>Ruthless Streamers</Link></div>
      </div>
    </div>
    <div id='siteBG'><img src='/media/phbg.jpg'/></div>
  </div>
  );
}

function openMobileNav() {
    if (document.getElementById('mobileNavBar2').style.opacity == 0) {
      document.getElementById('mobileNavBar2').style.opacity = 1;
      document.getElementById('mobileNavBar1').style.transform = 'translateY(0px) rotate(0deg)';
      document.getElementById('mobileNavBar3').style.transform = 'translateY(0px) rotate(0deg)';
      document.getElementById('navSubmenu').style.height = '0px';
    } else {
      document.getElementById('mobileNavBar2').style.opacity = 0;
      document.getElementById('mobileNavBar1').style.transform = 'translateY(12px) rotate(-45deg)';
      document.getElementById('mobileNavBar3').style.transform = 'translateY(-12px) rotate(45deg)';
      document.getElementById('navSubmenu').style.height = '100vh';
    }
}

function closeMobileNav() {
  document.getElementById('mobileNavBar2').style.opacity = 1;
  document.getElementById('mobileNavBar1').style.transform = 'translateY(0px) rotate(0deg)';
  document.getElementById('mobileNavBar3').style.transform = 'translateY(0px) rotate(0deg)';
  document.getElementById('navSubmenu').style.height = '0px';
}

export default Navigation;