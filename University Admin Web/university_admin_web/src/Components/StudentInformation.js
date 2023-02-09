import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';

function StudentInformation(){
    const [gridData, setGridData] = useState([]);
    const gridVals = [{id: 1, studentName: "Rio", registrationNumber: "KEC55215487", dob: "01/01/2007", gender: "Male", email: "rio@gmail.com", phone: 8745219965, course: "IT", instituteName: "SRM", university: "SRM", percentage: 75 }]
    const getStudentsGridData  = (e) => {
        fetch('https://localhost:44342/api/Student/GetStudents', 
        { 
            method: 'GET',
            withCredentials: true, 
            crossorigin: true,
            headers: {
            Accept: 'application/json','Content-Type': 'application/json'
            },
        }) 
        .then((res) => res.json())
        .then((data) => {
            setGridData(data);
            console.log(data);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        //getStudentsGridData();
        setGridData(gridVals);
     }, [])

    return(
        <div className="form-studentInformation">
            <div>
                <span style={{paddingLeft: "95%"}}></span>
                <Link to={"/"}>Log out</Link>
                {localStorage.removeItem("LoggedInEmail")}
            </div>
            <div><h1 className='studentInformation_header'>Student Information</h1></div>
            <div className="form-studentInformation-body">
            <Table responsive bordered hover>
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Registration Number</th>
                        <th>DOB</th>
                        <th>Gender</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Course</th>
                        <th>Institute Name</th>
                        <th>University</th>
                        <th>Percentage</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {gridData.map(d =>
                        <tr key = {d.id}>
                            <td>{d.studentName}</td>
                            <td>{d.registrationNumber}</td>
                            <td>{d.dob}</td>
                            <td>{d.gender}</td>
                            <td>{d.email}</td>
                            <td>{d.phone}</td>
                            <td>{d.course}</td>
                            <td>{d.instituteName}</td>
                            <td>{d.university}</td>
                            <td>{d.percentage}</td>
                            <td>
                                <button type="submit" class="btn">View</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            </div>
            </div>
    )
}

export default StudentInformation;