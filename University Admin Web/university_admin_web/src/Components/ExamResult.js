import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';

function ExamResult(){
    const [modalShow, setModalShow] = React.useState(false);
    const [gridData, setGridData] = useState([]);
    const [registrationNumber, setRegistrationNumber] = useState(null);
    const [studentName, setStudentName] = useState(null);
    const [courseCode, setCourseCode] = useState(null);
    const [semester, setSemester] = useState(null);
    const [courseName, setCourseName] = useState(null);
    const [mark, setMark] = useState(null);
    
    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "semester" && value !== 0)
        {
            setSemester(value);
            getExamMarksGridData(value);
        }
        if(id === "mark")
            setMark(value);
    }

    const getExamMarksGridData = (id) => {
        fetch('https://localhost:44343/api/Examinations/GetExaminationsBySemesterID?semesterType=' + id, 
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
            setSemester("I");
            getExamMarksGridData("I");
     }, [])
    
    return(
        <div className="form-evaluation">
        <div><h1 className='evaluation_header'>Exam Results</h1></div>
        <div className="form-evaluation-body">
            <div className='row'>
                <div className='col-md-4'>
                    <label className="form_label" for="semester">Semester </label><br></br>
                        <select className="form-control" id="semester" style={{width: "43%"}} value={semester} onChange = {(e) => handleInputChange(e)}>
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
            <Table responsive bordered hover variant="light">
                <thead>
                    <tr>
                        <th>Registration No.</th>
                        <th>Student Name</th>
                        <th>Date Of Birth</th>
                        <th>Course Code</th>
                        <th>Course Name</th>
                        <th>Marks</th>
                        <th>Is Published</th>
                    </tr>
                </thead>
                <tbody>
                    {gridData.map(d =>
                        <tr key = {d.id}>
                            <td>{d.registrationNo}</td>
                            <td>{d.studentName}</td>
                            <td>{d.dob}</td>
                            <td>{d.courseCode}</td>
                            <td>{d.courseName}</td>
                            <td>{d.mark}</td>
                            <td>{d.isPublishedResults}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
        </div>
    )
}

export default ExamResult;