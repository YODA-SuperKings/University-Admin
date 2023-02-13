import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';

function Evaluation(){
    const [gridData, setGridData] = useState([]);
    const [registrationNumber, setRegistrationNumber] = useState(null);
    const [studentName, setStudentName] = useState(null);
    const [courseCode, setCourseCode] = useState(null);
    const [semester, setSemester] = useState(null);
    const [courseName, setCourseName] = useState(null);
    const [mark, setMark] = useState(null);
    const [studentList, setStudentList] = useState([]);
    const [registrationNoList, setRegistrationNoList] = useState([]);
    const [courseNameList, setCourseNameList] = useState([]);
    let arry = [];
    
    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "semester" && value !== 0)
        {
            setSemester(value);
            getCourseData(value);
        }
        if(id === "mark")
            setMark(value);
    }

    const getStudentsData = () => {
        fetch('https://localhost:44343/api/Student/GetRegistrationNumbers', 
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
            setRegistrationNoList(data);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    const getCourseData = (semester) => {
        fetch('https://localhost:44343/api/Syllabus/GetSyllabusByID?semesterType=' + semester, 
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
            const tempData =[];
            data.find((item) =>{
                if (item.semesterType === semester)
                {
                    tempData.push(item); 
                } 
            });
            setCourseNameList(data);
        })
        .catch((error) => {
            console.error(error);
        });
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
            getStudentsData();
           
            getExamMarksGridData("I");
     }, [])
    
    return(
        <div className="form-evaluation">
        <div><h1 className='evaluation_header'>Exam Evaluation</h1></div>
        <div className="form-evaluation-body">
            <div className='row'>
                <div className='col-md-4'>
                    <label className="form_label" for="registrationNumber">Registration Number </label><br></br>
                    <select className="form-control" id="registrationNumber" value={registrationNumber} onChange = {(e) => handleInputChange(e)}>
                        {registrationNoList.map((option) => (<option value={option.value}>{option.label}</option>))}
                    </select>
                </div>
                <div className='col-md-4'>
                    <label className="form_label" for="semester">Semester </label><br></br>
                        <select className="form-control" id="semester" value={semester} onChange = {(e) => handleInputChange(e)}>
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
                <div className='col-md-4'>
                    <label className="form_label" for="courseName">Course Name </label><br></br>
                    <select className="form-control" id="courseName" value={courseName} onChange = {(e) => handleInputChange(e)}>
                        {courseNameList.map((option) => (<option value={option.value}>{option.label}</option>))}
                    </select>
                </div>
            </div>
            <br></br>
            <Table responsive bordered hover variant="light">
                <thead>
                    <tr>
                        <th>Course Code</th>
                        <th>Course Name</th>
                        <th>Marks</th>
                    </tr>
                </thead>
                <tbody>
                    {gridData.map(d =>
                        <tr key = {d.id}>
                            <td>{d.courseCode}</td>
                            <td>{d.courseName}</td>
                            <td>{d.mark}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
        </div>
    )
}

export default Evaluation;