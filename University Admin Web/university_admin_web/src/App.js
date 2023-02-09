import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './Styles/style.css';
import Sidebar from './Components/Sidebar';
import AdmissionForm from './Components/AdmissionForm';
import StudentInformation from './Components/StudentInformation';
import Payment from './Components/Payment';
import Document from './Components/Document';
import Banner from './Components/Banner';
import Login from './Components/Login';
import Registration from './Components/Registration';
import Home from './Components/Home';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
         <Sidebar>
          <Banner />
          <Routes>
            <Route path="Home" element={<Home />} />
            <Route path="AdmissionForm" element={<AdmissionForm />} />
            <Route path="StudentInformation" element={<StudentInformation />} />
            <Route path="Payment" element={<Payment />} />
            <Route path="Document" element={<Document />} />
            <Route path="Banner" element={<Banner />} />
            <Route path="Login" element={<Login />} />
            <Route path="Registration" element={<Registration />} />
          </Routes>
        </Sidebar>
      </BrowserRouter>
    </div>
  );
}

export default App;
