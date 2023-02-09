import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "./Components/Registration";
import Sidebar from './Components/Sidebar';
import Dashboard from './Components/Dashboard';
import About from './Components/About';
import Contact from './Components/Contact';
// import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter>
  <Routes>
    <Route index element={<App />} />
  </Routes>
  <Sidebar>
    <Routes>
      <Route path="Registration" element={<Registration />} />
      <Route path="Dashboard" element={<Dashboard />} />
      <Route path="About" element={<About />} />
      <Route path="Contact" element={<Contact />} />
    </Routes>
  </Sidebar>
  </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
