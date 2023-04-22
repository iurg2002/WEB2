import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import About from './About';
import { RouterProvider, createHashRouter } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createHashRouter([
  {
      path: "/",
      element: <App/>,
  },
  {
      path: "/about",
      element: <About/>,
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router}/>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
