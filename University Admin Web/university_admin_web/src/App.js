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
import Department from './Components/Department';
import Evaluation from './Components/Evaluation';
import CertificateVerfication from './Components/CertificateVerification';
import StudentPaymentDetails from './Components/StudentPaymentDetails';
import CollegeInfo from './Components/CollegeInfo';
import ProgramsOffered from './Components/ProgramsOffered';
import AffiliatedColleges from './Components/AffiliatedColleges';
import LogOut from './Components/LogOut';
import Syllabus from './Components/Syllabus';
import FeeStructure from './Components/FeeStructure';
import StudentAttendance from './Components/StudentAttendance';
import HolidayCalendar from './Components/HolidayCalendar';
import ExamTimeTable from './Components/ExamTimeTable';
import ConductUs from './Components/ConductUs';
import StudentProfile from './Components/StudentProfile';

function App() {
  const reloadPage = () => {
    window.location.reload();
  }

  return (
    <div className="App">
        <BrowserRouter>
         <Sidebar>
          <Banner />
          <Routes>
            <Route path="Home" element={<Home />} />
            <Route path="AdmissionForm" element={<AdmissionForm />} />
            <Route path="StudentInformation" element={<StudentInformation />} />
            <Route path="StudentProfile" element={<StudentProfile />} />
            <Route path="Payment" element={<Payment />} />
            <Route path="Document" element={<Document />} />
            <Route path="Department" element={<Department />} />
            <Route path="Evaluation" element={<Evaluation />} />
            <Route path="Banner" element={<Banner />} />
            <Route path="Login" element={<Login onSubmit={reloadPage}/>} />
            <Route path="Registration" element={<Registration />} />
            <Route path="CertificateVerfication" element={<CertificateVerfication />} />
            <Route path="StudentPaymentDetails" element={<StudentPaymentDetails />} />
            <Route path="CollegeInfo" element={<CollegeInfo />} />
            <Route path="ProgramsOffered" element={<ProgramsOffered />} />
            <Route path="AffiliatedColleges" element={<AffiliatedColleges />} />
            <Route path="Syllabus" element={<Syllabus />} />
            <Route path="FeeStructure" element={<FeeStructure />} />
            <Route path="StudentAttendance" element={<StudentAttendance />} />
            <Route path="HolidayCalendar" element={<HolidayCalendar />} />
            <Route path="ExamTimeTable" element={<ExamTimeTable />} />
            <Route path="ConductUs" element={<ConductUs />} />
            <Route path="LogOut" element={<LogOut />} />
          </Routes>
        </Sidebar>
      </BrowserRouter>
    </div>
  );
}

export default App;
