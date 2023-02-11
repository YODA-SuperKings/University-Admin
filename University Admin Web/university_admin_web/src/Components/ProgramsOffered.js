import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';

function ProgramsOffered() {
    const [gridData, setGridData] = useState([]);
    const getCollegeInfoGridData  = (e) => {
        fetch('https://localhost:44343/api/ProgramsOffered/GetProgramsOffered', 
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
        })
        .catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        getCollegeInfoGridData();
     }, [])

    return ( 
        <div className="form-collegeInfo">
            <div><h1 className='document_header'>PROGRAMS OFFERED</h1></div>
            <div className="form-collegeInfo-body">
                <Table responsive bordered hover>
                    <thead>
                        <tr>
                         <th>SNO</th>
                         <th>Course Name</th>
                        </tr>
                    </thead>
                    <tbody> 
                        {gridData.map(d =>
                            <tr key = {d.id}>
                                <td>{d.slno}</td>
                                <td>{d.courseName}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default ProgramsOffered;