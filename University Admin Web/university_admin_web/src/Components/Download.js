import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { AiOutlineDownload } from 'react-icons/ai';
import Table from 'react-bootstrap/Table';
function Download(){
    const navigate = useNavigate();
     const [gridData, setGridData] = useState([]);
     const [semesterGridData, setSemesterGridData] = useState([]);
     const [semesterType, setsemesterType] = useState([]);
    const gridVals = [{id: 1, SNo:1, DocumentType: "HallTicket"},
    {id: 2, SNo:2, DocumentType: "CCCeritificate",},
    {id: 3, SNo:3, DocumentType: "DegreeCerificate",},
    {id: 4, SNo:4, DocumentType: "ProvisionCertificate",}
 
]

let gridSemsterGridVals = [{id: 1, SNo:1, DocumentType:"Semester "+ semesterType+ " Mark Sheet"}]
const getStudentData  = (e) => {
    fetch('https://localhost:44343/api/Users/GetStudentByUserID?registrationNo=' + registrationNumber, 
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
        setRegistrationNumber(registrationNumber);
        setStudentName(data.firstName + ' ' + data.lastName);
        
        console.log(data);
    })
    .catch((error) => {
        console.error(error);
    });
}
const downloadDocument = (DocumentType) => {
 
    fetch(DocumentType +'.pdf')
    .then(response => {
         response.blob().then(blob => {
             const fileURL = window.URL.createObjectURL(blob);
             let alink = document.createElement('a');
             alink.href = fileURL;
             alink.download = DocumentType +'.pdf';
             alink.click();
         })
     })
    }
   
    useEffect(() => {
        setGridData(gridVals);
        getStudentData();
     }, [])


     const handleInputChange = (e) => {
        debugger;
         const {id , value} = e.target;
           setSyllabus(value);
           setsemesterType(value);
           setSemesterGridData(gridSemsterGridVals);
     }
    const [studentName, setStudentName] = useState(null);
    const [registrationNumber, setRegistrationNumber] = useState(localStorage.getItem('RegistrationNumber'));
    const [syllabus, setSyllabus] = useState([]);
   
    return(
        <div className="form-payment">
            <div><h1 className='document_header'>Downloads</h1></div>
            <div className="form-payment-body">
            <div className='row'>
                        
                        <div className='col-md-6'>
                            <label className="registrationNumber_label" for="registrationNumber">Registration Number :&nbsp;</label>
                            <label className="registrationNumber_label" type="number" id="registrationNumber">{registrationNumber}</label>
                        </div>
                        <div className='col-md-6'>
                            <label className="studentName_label" for="studentName">Student :&nbsp;</label>
                            <label className="studentName_label" type="number" id="studentName">{studentName}</label>
                        </div>
                     </div>
             <Table responsive bordered hover variant="light">
                <thead>
                    <tr>
                        <th>Sl No</th>
                        <th>Document Type</th>
                        <th>Download</th>
                         </tr>
                                       
                </thead>
                <tbody>
                    {gridData.map(d =>
                        <tr key = {d.id}>
                            <td>{d.SNo}</td>
                            <td>{d.DocumentType}</td>
                            <td>
                            <span style={{fontSize: "large", cursor: 'pointer', color: '#785fa0'}}> <AiOutlineDownload onClick={() => downloadDocument(d.DocumentType)}/></span>
                             </td>
                            
                        </tr>
                        
                        
                    )}
                </tbody>
            </Table>
            </div>
            <div className='row'>
                <div className='col-md-4'>
                    <label className="form_label" for="syllabus">Semester Mark Sheet</label><br></br>
                        <select className="form-control" id="syllabus" style={{width: "43%"}} value={syllabus} onChange = {(e) => handleInputChange(e)}>
                        <option value={""}>Select</option>
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
            <br/>
            <Table responsive bordered hover variant="light">
                <thead>
                    <tr>
                        <th>Sl No</th>
                        <th>Document Type</th>
                        <th>Download</th>
                         </tr>
                                       
                </thead>
                <tbody>
                   
                    {semesterGridData.map(d =>
                        <tr key = {d.id}>
                            <td>{d.SNo}</td>
                            <td>{d.DocumentType}</td>
                            <td>
                            <span style={{fontSize: "large", cursor: 'pointer', color: '#785fa0'}}> <AiOutlineDownload onClick={() => downloadDocument(d.DocumentType)}/></span>
                             </td>
                        </tr>
                        
                        
                    )}
                </tbody>
            </Table>
            <div className="payment_footer">
                
            </div>
        </div>
    )
}


export default Download;