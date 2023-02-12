import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';

function Syllabus() {
    const [gridData, setGridData] = useState([]);
    const [syllabus, setSyllabus] = useState([]);
    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "syllabus")
        {
            setSyllabus(value);
            getSyllabus(value);
        }
    }

    const getSyllabus= (id) => {
        fetch('https://localhost:44343/api/Syllabus/GetSyllabusByID?semesterType=' + id, 
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
            debugger;
            setGridData(data);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    return(
        <div className="form-affiliatedColleges">
        <div><h1 className='affiliatedColleges_header'>Syllabus</h1></div>
        <div className="form-affiliatedColleges-body">
            <div className='row'>
                <div className='col-md-4'>
                    <label className="form_label" for="syllabus">Syllabus </label><br></br>
                        <select className="form-control" id="syllabus" value={syllabus} onChange = {(e) => handleInputChange(e)}>
                            <option value={"0"}>-Select-</option>
                            <option value={"I"}>Semester 1</option>
                            <option value={"II"}>Semester 2</option>
                            <option value={"III"}>Semester 3</option>
                            <option value={"IV"}>Semester 4</option>
                            <option value={"V"}>Semester 5</option>
                            <option value={"VI"}>Semester 6</option>
                            <option value={"VII"}>Semester 7</option>
                            <option value={"VIII"}>Semester 8</option>
                        </select>
                </div>
            </div>
            <br></br>
            <Table responsive bordered hover>
                <thead>
                    <tr>
                        <th>Course Code</th>
                        <th>Part</th>
                        <th>Course Title</th>
                        <th>Hours</th>
                        <th>Credit</th>
                        <th>CIA</th>
                        <th>ESE</th>
                    </tr>
                </thead>
                <tbody>
                    {gridData.map(d =>
                        <tr key = {d.id}>
                            <td>{d.courseCode}</td>
                            <td>{d.part}</td>
                            <td>{d.courseTitle}</td>
                            <td>{d.hours}</td>
                            <td>{d.credit}</td>
                            <td>{d.cia}</td>
                            <td>{d.ese}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
        </div>
    )
}

export default Syllabus;