import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import {action as loginAction, Login} from './pages/login';
import {
  action as signUpAction,
  SignUp
} from './pages/signup';
import Home from './pages/user/home';
import { HomeIndex } from './pages/user/home_index';
import {
  Disease,
  loader as diseaseLoader
} from './pages/user/disease';
import {
  HistoryAndFavorite,
  HistoryLoader,
  FavoriteLoader,
} from './pages/user/history_and_favorite';
import Watch from './pages/user/watch';

import './css/font.css';
import './css/app.css';

const router = createBrowserRouter(
  [
    {
      path: "/login",
      element: <Login/>,
      action: loginAction,
    },
    {
      path: "/signup",
      element: <SignUp/>,
      action: signUpAction,
    },
    {
      path: "/",
      element: <Home />,
      children: [
        {
          index: true,
          element: <HomeIndex />
        },
        {
          path: '/history',
          element: <HistoryAndFavorite />,
          loader: HistoryLoader,
        },
        {
          path: '/tonton',
          element: <Watch />,
        },
        {
          path: '/favorit',
          element: <HistoryAndFavorite />,
          loader: FavoriteLoader,
        },
        {
          path: '/:disease',
          element: <Disease />,
          loader: diseaseLoader,
        }
      ],
    },
  ]
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
