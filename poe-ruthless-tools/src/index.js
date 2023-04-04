import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import GemGuide from './routes/GemGuide';
import Home from './routes/Home';
import LeagueContent from './routes/LeagueContent';
import Navigation from './routes/Navigation';
import RecipeGuide from './routes/RecipeGuide';
import Streamers from './routes/Streamers';
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
//import reportWebVitals from './reportWebVitals';
import { createRoot } from "react-dom/client";
import {
  Route,
  Link,
  Outlet,
} from "react-router-dom";

const AppLayout = () => {
  return (
    <>
    <Navigation />
    <Outlet />
    </>
 )}


const router = createBrowserRouter([
  {
    element: <AppLayout/>,
    children: [
      {
        path: '',
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
      }
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();