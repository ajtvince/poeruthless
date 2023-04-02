import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import GemGuide from './components/GemGuide';
import Home from './components/Home';
import LeagueContent from './components/LeagueContent';
import Navigation from './components/Navigation';
import RecipeGuide from './components/RecipeGuide';
import Streamers from './components/Streamers';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
  },
  {
    path: '/skillgems',
    element: <GemGuide/>,
  },
  {
    path: '/leaguecontent',
    element: <LeagueContent/>,
  },
  {
    path: '/recipes',
    element: <RecipeGuide/>,
  },
  {
    path: '/streamers',
    element: <Streamers/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navigation />
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
