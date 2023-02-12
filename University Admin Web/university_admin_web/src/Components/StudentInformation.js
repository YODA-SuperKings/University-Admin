import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import { FcApproval } from 'react-icons/fc';

function StudentInformation(){
    const [gridData, setGridData] = useState([]);
    const getStudentsGridData  = (e) => {
        fetch('https://localhost:44343/api/Student/GetStudent', 
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
        getStudentsGridData();
     }, [])

     const UpdateStudent = (regNo) => {
        fetch('https://localhost:44343/api/Student/UpdateStudent?registrationCode=' + regNo , 
        { 
            method: 'POST',
            withCredentials: true, 
            crossorigin: true,
            headers: {
            Accept: 'application/json','Content-Type': 'application/json'
            },
        }) 
        .then((res) => res.json())
        .then((data) => {
            getStudentsGridData();
            console.log(data);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    return(
        <div className="form-studentInformation">
            <div><h1 className='document_header'>Student Information</h1></div>
            <div className="form-studentInformation-body">
            <Table responsive bordered hover>
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Registration Number</th>
                        <th>College Name</th>
                        <th>DOB</th>
                        <th>Gender</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Course</th>
                        <th>Percentage</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {gridData.map(d =>
                        <tr key = {d.id}>
                            <td>{d.firstName + ' ' + d.lastName}</td>
                            <td>{d.registrationNo}</td>
                            <td>{d.collegeName}</td>
                            <td>{d.dateofBirth}</td>
                            <td>{d.gender}</td>
                            <td>{d.email}</td>
                            <td>{d.phoneNumber}</td>
                            <td>{d.courseAppliedType}</td>
                            <td>{d.percentage}</td>
                            <td>
                                {d.isActive?"" : <span style={{fontSize: "large", cursor: 'pointer', color: '#785fa0',marginLeft: "18px"}}><FcApproval onClick={() => UpdateStudent(d.registrationNo)}/></span>}
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