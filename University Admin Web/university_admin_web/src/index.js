import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "./Components/Registration";
import Sidebar from './Components/Sidebar';
import AdmissionForm from './Components/AdmissionForm';
import StudentInformation from './Components/StudentInformation';
import Payment from './Components/Payment';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter>
  <Routes>
    <Route index element={<App />} />
  </Routes>
  <Sidebar>
    <Routes>
      <Route path="AdmissionForm" element={<AdmissionForm />} />
      <Route path="StudentInformation" element={<StudentInformation />} />
      <Route path="Payment" element={<Payment />} />
    </Routes>
  </Sidebar>
  </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
