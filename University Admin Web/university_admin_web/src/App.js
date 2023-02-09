import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './Styles/style.css';
import Sidebar from './Components/Sidebar';
import AdmissionForm from './Components/AdmissionForm';
import StudentInformation from './Components/StudentInformation';
import Payment from './Components/Payment';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
         <Sidebar>
          <Routes>
            <Route path="AdmissionForm" element={<AdmissionForm />} />
            <Route path="StudentInformation" element={<StudentInformation />} />
            <Route path="Payment" element={<Payment />} />
          </Routes>
        </Sidebar>
      </BrowserRouter>
    </div>
  );
}

export default App;
