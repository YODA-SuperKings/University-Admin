import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
function Evaluation(){
    const [gridData, setGridData] = useState([]);
    const gridVals = [{id: 1, sno:"1", studentName: "Suriya", sub1: 10, sub2: 10, sub3: 10, sub4: 10,total: 40,cgpa:"85%",result:"A Grade"}]
    const [sno, setSNo] = useState(null);
    const [studentName, setStudentName] = useState(null);
    const [sub1, setSub1] = useState(null);
    const [sub2, setSub2] = useState(null);
    const [sub3, setSub3] = useState(null);
    const [sub4, setSub4] = useState(null);
    const [total, setTotal] = useState(null);
    const [cgpa, setCGPA] = useState(null);
    const [result, setResult] = useState(null);
    
    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "sno")
        setSNo(value);
        if(id === "studentName")
        setStudentName(value);
        if(id === "sub1")
        setSub1(value);
        if(id === "sub2")
        setSub2(value);
        if(id === "sub3")
        setSub3(value);
        if(id === "sub4")
        setSub4(value);
        if(id === "sub4")
        setSub4(value);
        if(id === "total")
        setTotal(value);
        if(id === "cgpa")
        setCGPA(value);
        if(id === "result")
        setResult(value);
        
    }
    useEffect(() => {
        //getEvaluationGridData();
        setGridData(gridVals);
     }, [])
     const handleSaveSubmit = (e) => {
        
     }
     
    
    return(
       
        <div className="form-evaluation">
        <div><h1 className='evaluation_header'>Evaluation</h1></div>
        <div className="form-evaluation-body">
        <span style={{paddingLeft: "87%"}}></span>
       <Table responsive bordered hover>
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>Student Name</th>
                    <th>Sub 1</th>
                    <th>Sub 2</th>
                    <th>Sub 3</th>
                    <th>Sub 4</th>
                    <th>Total</th>
                    <th>CGPA</th>
                    <th>Result</th>
                </tr>
            </thead>
            <tbody>
                {gridData.map(d =>
                    <tr key = {d.id}>
                        <td>{d.sno}</td>
                        <td>{d.studentName}</td>
                        <td>{d.sub1}</td>
                        <td>{d.sub2}</td>
                        <td>{d.sub3}</td>
                        <td>{d.sub4}</td>
                        <td>{d.total}</td>
                        <td>{d.cgpa}</td>
                        <td>{d.result}</td>
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

export default Evaluation;