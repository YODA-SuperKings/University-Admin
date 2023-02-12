import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';

function StudentAttendance(){
    const [modalShow, setModalShow] = React.useState(false);
    const [gridData, setGridData] = useState([]);
    const [gridCVDocumentData, setGridCVDocumentData] = useState([]);
    const [registrationNumber, setRegistrationNumber] = useState(null);
    const [candidateName, setCandidateName] = useState(null);
    const [courseBranch, setCourseBranch] = useState(null);
    const [monthAndYearOfPassing, setMonthAndYearOfPassing] = useState(null);
    const gridVals = [{id: 1, RegistratioNumber: "KEC12457885", StudentName: "Jim", SEM1_Sub:25,  SEM2_Sub:21, SEM3_Sub:23, SEM4_Sub:15 ,SEM5_Sub:25 ,SEM6_Sub:25 ,Total:134,AttendancePercent:"74%" },
    {id: 1, RegistratioNumber: "KEC12457886", StudentName: "Jim", SEM1_Sub:30,  SEM2_Sub:25, SEM3_Sub:25, SEM4_Sub:21 ,SEM5_Sub:20 ,SEM6_Sub:30 ,Total:151,AttendancePercent:"83%" }]

      useEffect(() => {
        //getCertificateVerificationGridData();
        setGridData(gridVals);
     }, [])

    return(
        <div className="form-studentAttendance">
            <div><h1 className='document_header'>Student Attendance</h1></div>
            <div className="form-studentAttendance-body">
            <span style={{paddingLeft: "87%"}}></span>
            <Table  responsive bordered hover variant="light">
                <thead>
                    <tr>
                        <th>SNo.</th>
                        <th>Reg No.</th>
                        <th>Student Name</th>
                        <th>Engg Chemistry-I</th>
                        <th>Engg Graphics</th>
                        <th>Mathematics-I</th>
                        <th>Engg Physics-I</th>
                        <th>Comp Practice Lab-I</th>
                        <th>Engg Practice Laboratory - I</th>
                        <th>Total(180 days)</th>
                        <th>Attendance %</th>
                    </tr>
                </thead>
                <tbody>
                    {gridData.map(d =>
                        <tr key = {d.id}>
                            <td>{d.id}</td>
                            <td>{d.RegistratioNumber}</td>
                            <td>{d.StudentName}</td>
                            <td>{d.SEM1_Sub}</td>
                            <td>{d.SEM2_Sub}</td>
                            <td>{d.SEM3_Sub}</td>
                            <td>{d.SEM4_Sub}</td>
                            <td>{d.SEM5_Sub}</td>
                            <td>{d.SEM6_Sub}</td>
                            <td>{d.Total}</td>
                            <td>{d.AttendancePercent}</td>
                            
                        </tr>
                    )}
                </tbody>
            </Table>
            </div>
            </div>
    )
}

export default StudentAttendance;
