import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import { FcApproval } from 'react-icons/fc';

function CollegeInfo(){
    const [collegeCode, setCollegeCode] = useState(null);
    const [gridData, setGridData] = useState([]);
    const ApproveCollege = (id, collegeCode) => {
        setCollegeCode(collegeCode);

        fetch('https://localhost:44343/api/CollegeRegistration/UpdateCollegeRegistration?id=' + id + '&code=' + collegeCode, 
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
            getCollegeInfoGridData();
            console.log(data);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    const getCollegeInfoGridData  = (e) => {
        fetch('https://localhost:44343/api/CollegeRegistration/GetCollegeRegistration', 
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
        getCollegeInfoGridData();
     }, [])

     function approveIcon(){

     }

    return(
        <div className="form-collegeInfo">
            <div><h1 className='document_header'>Collge Information</h1></div>
            <div className="form-collegeInfo-body">
                <Table responsive bordered hover variant="light">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Institute Name</th>
                            <th>College Type</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>District</th>
                            <th>State</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gridData.map(d =>
                            <tr key = {d.id}>
                                <td>{d.code}</td>
                                <td>{d.nameofInstitute}</td>
                                <td>{d.type}</td>
                                <td>{d.email}</td>
                                <td>{d.phoneNumber}</td>
                                <td>{d.address}</td>
                                <td>{d.city}</td>
                                <td>{d.district}</td>
                                <td>{d.state}</td>
                                <td>
                                   {d.isActive?"":<span style={{fontSize: "large", cursor: 'pointer', color: '#785fa0',marginLeft: "18px"}}><FcApproval onClick={() => ApproveCollege(d.id, d.code)}/></span>} 
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default CollegeInfo;