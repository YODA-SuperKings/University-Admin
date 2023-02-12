import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';

function FeeStructure() {

    const [gridData, setGridData] = useState([]);
    
    const getFeeStructure= (e) => {
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
            data.sort((a,b) => a.course.localeCompare(b.course));
             const temp =[];
             data.find((item) =>{
                if (item.slno === "1" || item.slno === "11")
                {
                    temp.push(item);
                }
            } );
            setGridData(temp);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        getFeeStructure();
     }, [])


    return(
        <div className="form-affiliatedColleges">
        <div><h1 className='document_header'>Fee Structure</h1></div>
        <div className="form-affiliatedColleges-body">
            <Table responsive bordered hover>
                <thead>
                    <tr>
                        <th>Sr. No.</th>
                        <th>Course</th>
                        <th>General Fee</th>
                        <th>Duration (Years)</th>
                    </tr> 
                </thead>
                <tbody>
                    {gridData.map((item,index) =>
                        <tr key = {item.id}>
                            <td>{index + 1}</td>
                            <td>{item.course}</td>
                            <td>{item.feeAmount}</td>
                            <td>{item.year}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
        </div>
    )
}

export default FeeStructure;