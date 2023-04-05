import React from 'react';
import { useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import './stylesheets/Navigation.css';

function Navigation() {
  
  const openMobileNav = () => {
    let navZ = document.getElementById('navbar');
    let bar1 = document.getElementById('navbarM').getElementsByTagName('div')[0];
    let bar2 = document.getElementById('navbarM').getElementsByTagName('div')[1];
    let bar3 = document.getElementById('navbarM').getElementsByTagName('div')[2];
    let navZIndex = parseInt(navZ.style.zIndex);
    let animTime = {
      duration: 150,
      fill: 'forwards',
    };
    if(navZIndex == -99) {
      navZ.style.zIndex = 99;
      let bar1anim = [
        { transform: 'translateY(0px)', offset: 0 },
        { transform: 'translateY(8px)', offset: 0.4 },
        { transform: 'translateY(8px) rotate(0deg)', offset: 0.6 },
        { transform: 'translateY(8px) rotate(45deg)', offset: 1 },
      ];
      bar1.animate(bar1anim, animTime);
      let bar2anim = [
        { opacity: 1, offset: 0 },
        { opacity: 1, offset: 0.4 },
        { opacity: 1, offset: 0.6 },
        { opacity: 0, offset: 1 },
      ];
      bar2.animate(bar2anim, animTime);
      let bar3anim = [
        { transform: 'translateY(0px)', offset: 0 },
        { transform: 'translateY(-8px)', offset: 0.4 },
        { transform: 'translateY(-8px) rotate(0deg)', offset: 0.6 },
        { transform: 'translateY(-8px) rotate(-45deg)', offset: 1 },
      ];
      bar3.animate(bar3anim, animTime);
    } else {
      navZ.style.zIndex = -99;
      let bar1anim = [
        { transform: 'translateY(8px) rotate(45deg)', offset: 0 },
        { transform: 'translateY(8px) rotate(45deg)', offset: 0.4 },
        { transform: 'translateY(8px) rotate(45deg)', offset: 0.6 },
        { transform: 'translateY(0px) rotate(0deg)', offset: 1 },
      ];
      bar1.animate(bar1anim, animTime);
      let bar2anim = [
        { opacity: 0, offset: 0 },
        { opacity: 0, offset: 0.4 },
        { opacity: 0, offset: 0.6 },
        { opacity: 1, offset: 1 },
      ];
      bar2.animate(bar2anim, animTime);
      let bar3anim = [
        { transform: 'translateY(-8px) rotate(-45deg)', offset: 0 },
        { transform: 'translateY(-8px) rotate(-45deg)', offset: 0.4 },
        { transform: 'translateY(-8px) rotate(-45deg)', offset: 0.6 },
        { transform: 'translateY(0px) rotate(0deg)', offset: 1 },
      ];
      bar3.animate(bar3anim, animTime);
    }
  }

  const closeMobileNav = () => {
    let navZ = document.getElementById('navbar');
    let navZIndex = parseInt(navZ.style.zIndex);
    let animTime = {
      duration: 150,
      fill: 'forwards',
    };
    if (navZIndex === 99) {
      navZ.style.zIndex = -99;
      let bar1 = document.getElementById('navbarM').getElementsByTagName('div')[0];
      let bar2 = document.getElementById('navbarM').getElementsByTagName('div')[1];
      let bar3 = document.getElementById('navbarM').getElementsByTagName('div')[2];
      let bar1anim = [
        { transform: 'translateY(8px) rotate(45deg)', offset: 0 },
        { transform: 'translateY(8px) rotate(45deg)', offset: 0.4 },
        { transform: 'translateY(8px) rotate(45deg)', offset: 0.6 },
        { transform: 'translateY(0px) rotate(0deg)', offset: 1 },
      ];
      bar1.animate(bar1anim, animTime);
      let bar2anim = [
        { opacity: 0, offset: 0 },
        { opacity: 0, offset: 0.4 },
        { opacity: 0, offset: 0.6 },
        { opacity: 1, offset: 1 },
      ];
      bar2.animate(bar2anim, animTime);
      let bar3anim = [
        { transform: 'translateY(-8px) rotate(-45deg)', offset: 0 },
        { transform: 'translateY(-8px) rotate(-45deg)', offset: 0.4 },
        { transform: 'translateY(-8px) rotate(-45deg)', offset: 0.6 },
        { transform: 'translateY(0px) rotate(0deg)', offset: 1 },
      ];
      bar3.animate(bar3anim, animTime);
    }
  }

  const handleResize = () => {
    let navZ = document.getElementById('navbar');
    let navZIndex = parseInt(navZ);
    let currentW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let currentWInt = parseInt(currentW);
    if (currentWInt >= 1000 ) {
      navZ.style.removeProperty('z-index');
    } else {
      if (navZIndex !== 99) {
        navZ.style.zIndex = -99;
      }
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize, false);
    let currentW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let currentWInt = parseInt(currentW);
    if (currentWInt < 1000) {
      let navZ = document.getElementById('navbar');
      navZ.style.zIndex = -99;
    }
  }, []);

  return (
    <div>
      <div id='navbar'>
        <Link to='/' onClick={closeMobileNav}>Home</Link>
        <Link to='/skillgems' onClick={closeMobileNav}>Skill Gems</Link>
        <Link to='/leaguecontent' onClick={closeMobileNav}>League Content</Link>
        <Link to='/recipes' onClick={closeMobileNav}>Recipes</Link>
        <Link to='/streamers' onClick={closeMobileNav}>Ruthless Streamers</Link>
      </div>
      <div onClick={openMobileNav} id='navbarM'>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );

/**
  return (<div>
    <div id='nav'>
      <div onClick={() => openMobileNav()} id='mobileNavBtn'>
        <div id='mobileNavBar1'></div>
        <div id='mobileNavBar2'></div>
        <div id='mobileNavBar3'></div>
      </div>
      <div id='navSubmenu'>
        <div className='navItem'><Link to='/' onClick={() => closeMobileNav()}>Home</Link></div>
        <div className='navItem'><Link to='/skillgems' onClick={() => closeMobileNav()}>Skill Gems</Link></div>
        <div className='navItem'><Link to='/leaguecontent' onClick={() => closeMobileNav()}>League Content</Link></div>
        <div className='navItem'><Link to='/recipes' onClick={() => closeMobileNav()}>Recipes</Link></div>
        <div className='navItem'><Link to='/streamers' onClick={() => closeMobileNav()}>Ruthless Streamers</Link></div>
      </div>
    </div>
    <div id='siteBG'><img src='/media/phbg.jpg'/></div>
  </div>
  );
  window.addEventListener("load", (event) => document.getElementById('mobileNavBar2').style.opacity = 1);

  function openMobileNav() {
      if (document.getElementById('mobileNavBar2').style.opacity == 0) {
        document.getElementById('mobileNavBar2').style.opacity = 1;
        document.getElementById('mobileNavBar1').style.transform = 'translateY(12px) rotate(0deg)';
        document.getElementById('mobileNavBar3').style.transform = 'translateY(-12px) rotate(0deg)';
        document.getElementById('mobileNavBar1').style.transform = 'translateY(0px) rotate(0deg)';
        document.getElementById('mobileNavBar3').style.transform = 'translateY(0px) rotate(0deg)';
        document.getElementById('navSubmenu').style.height = '0px';
      } else {
        document.getElementById('mobileNavBar2').style.opacity = 0;
        document.getElementById('mobileNavBar1').style.transform = 'translateY(12px) rotate(0deg)';
        document.getElementById('mobileNavBar3').style.transform = 'translateY(-12px) rotate(0deg)';
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
  **/
}



export default Navigation;