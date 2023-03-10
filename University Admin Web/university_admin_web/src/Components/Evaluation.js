import React, {useState, useEffect} from 'react';
import toast from 'react-simple-toasts';
import Table from 'react-bootstrap/Table';

function Evaluation(){
    const [gridData, setGridData] = useState([]);
    const [registrationNumber, setRegistrationNumber] = useState(null);
    const [semester, setSemester] = useState(null);
    const [courseName, setCourseName] = useState(null);
    const [mark, setMark] = useState(null);
    const [studentList, setStudentList] = useState([]);
    const [registrationNoList, setRegistrationNoList] = useState([]);
    const [courseNameList, setCourseNameList] = useState([]);
    let loginType = localStorage.getItem("LoginType");
    
    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "registrationNumber")
            setRegistrationNumber(value);
        if(id === "semester" && value !== 0)
        {
            setSemester(value);
            getCourseData(value);
            getExamMarksGridData(registrationNumber,value);
        }
        if(id === "courseName")
            setCourseName(value);
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
            if(data !== null)
            {
                setRegistrationNoList(data);
                setRegistrationNumber(data[0].value);
            }
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
            if(data !== null)
            {
                setCourseNameList(data);
                setCourseName(data[0].courseCode);
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }

    const getExamMarksGridData = (regno, semesterId) => {
        fetch('https://localhost:44343/api/Examinations/GetExaminationsByRegistrationID?registrationNo=' + regno + '&semesterType=' + semesterId, 
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

    const SaveMark = () => {
        let toastColor = '';
        const postBody = {
            RegistrationNo: registrationNumber,
            CourseCode: courseName,
            Mark: mark,
            IsPublishedResults: "Not Published"
        }
        fetch('https://localhost:44343/api/Examinations/CreateExaminations', 
        { 
            method: 'POST',
            body: JSON.stringify(postBody),
            withCredentials: true, 
            crossorigin: true,
            headers: {
            Accept: 'application/json','Content-Type': 'application/json'
            },
        }) 
        .then((res) => res.json())
        .then((data) => {
            if(data === "Mark already exists.")
                toastColor = 'Red';
            else{
                toastColor = 'Green';
                getExamMarksGridData(registrationNumber,semester);
            }
            toast(<><b style={{ color: toastColor }}>{data}</b></>, { position: 'top-right' });
            console.log(data);
        })
        .catch((error) => {
            toast(<><b style={{ color: 'Red' }}>{error}</b></>, { position: 'top-right' });
            console.error(error);
        });
    }

    const Publish = () => {
        fetch('https://localhost:44343/api/Examinations/UpdateExaminations', 
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
            toast(<><b style={{ color: 'Green' }}>{data}</b></>, { position: 'top-right' });
            console.log(data);
        })
        .catch((error) => {
            toast(<><b style={{ color: 'Red' }}>{error}</b></>, { position: 'top-right' });
            console.error(error);
        });
    }

    useEffect(() => {
            getStudentsData();
            if(loginType === "1"){
                document.getElementById("divcourseName").style.display = "none";
                document.getElementById("divmark").style.display = "none";
                document.getElementById("divSaveMark").style.display = "none";
                document.getElementById("divPublish").style.display = "block";
            }
            else{
                document.getElementById("divcourseName").style.display = "block";
                document.getElementById("divmark").style.display = "block";
                document.getElementById("divSaveMark").style.display = "block";
                document.getElementById("divPublish").style.display = "none";
            }
     }, [])
    
    return(
        <div className="form-evaluation">
        <div><h1 className='evaluation_header'>Exam Evaluation</h1></div>
        <div className="form-evaluation-body">
            <div className='row'>
                <div className='col-md-4' style={{width: "20%"}}>
                    <label className="form_label" for="registrationNumber">Registration Number </label><br></br>
                    <select className="form-control" id="registrationNumber" value={registrationNumber} onChange = {(e) => handleInputChange(e)}>
                        {registrationNoList.map((option) => (<option value={option.value}>{option.label}</option>))}
                    </select>
                </div>
                <div className='col-md-4' style={{width: "20%"}}>
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
                <div id="divcourseName" className='col-md-4'style={{width: "20%"}}>
                    <label className="form_label" for="courseName">Course Name </label><br></br>
                    <select className="form-control" id="courseName" value={courseName} onChange = {(e) => handleInputChange(e)}>
                        {courseNameList.map((option) => (<option value={option.courseCode}>{option.courseTitle}</option>))}
                    </select>
                </div>
                <div id="divmark" className='col-md-4' style={{width: "20%"}}>
                    <label className="form_label" for="mark">Mark </label><br></br>
                    <input  type="text" name="" id="mark" className="form-control" value={mark} onChange = {(e) => handleInputChange(e)} placeholder="Mark"/>
                </div>
                <div id="divSaveMark" className='col-md-4' style={{width: "20%", paddingTop: "25px"}}>
                    <button variant="primary" onClick={(e)=>SaveMark(e)} type="submit" class="btn_add_document">Save Mark</button>
                </div>
                <div id="divPublish" className='col-md-4' style={{width: "20%", paddingTop: "25px"}}>
                    <button variant="primary" onClick={(e)=>Publish(e)} type="submit" class="btn_add_document">Publish</button>
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