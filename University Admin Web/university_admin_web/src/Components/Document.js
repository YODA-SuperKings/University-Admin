import React, {useState, useEffect} from 'react';
import { FaFileDownload } from 'react-icons/fa';
import Table from 'react-bootstrap/Table';
import toast from 'react-simple-toasts';

function Document(){
    const [studentName, setStudentName] = useState("Jim Carey");
    const [registrationNumber, setRegistrationNumber] = useState(null);
    const [modalShow, setModalShow] = React.useState(false);
    const [gridData, setGridData] = useState([]);
    const [documentType, setDocumentType] = useState(null);
    const [filePath, setFilePath] = useState(null);

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "documentType")
            setDocumentType(value);
        if(id === "filePath")
            setFilePath(e.target.files[0].name);
    }

    const getDocumentGridData  = (e) => {
        fetch('https://localhost:44343/api/Document/GetDocument', 
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
            setRegistrationNumber(data[0].registrationNo)
            setGridData(data);
            console.log(data);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        getDocumentGridData();
     }, [])

     const handleSaveSubmit = (e) => {
        const postBody = {
            RegistrationNo: registrationNumber,
            DocumentType: documentType,
            FilePath: filePath
        };
        fetch('https://localhost:44343/api/Document/CreateDocument', 
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
            getDocumentGridData();
            toast(<><b style={{ color: 'Green' }}>{data}</b></>, { position: 'top-right' });
            console.log(data);
        })
        .catch((error) => {
            toast(<><b style={{ color: 'Red' }}>{error}</b></>, { position: 'top-right' });
            console.error(error);
        });
     }

    return(
        <div className="form-document">
            <div><h1 className='document_header'>Documents</h1></div>
            <div className="form-document-body">
            <div className='row'>
                <div className='col-md-6'>
                    <label className="studentName_label" for="studentName">Student :&nbsp;</label>
                    <label className="studentName_label" type="number" id="studentName">{studentName}</label>
                </div>
                <div className='col-md-6'>
                    <label className="registrationNumber_label" for="registrationNumber">Registration Number :&nbsp;</label>
                    <label className="registrationNumber_label" type="number" id="registrationNumber">{registrationNumber}</label>
                </div>
            </div>
            <br></br>
            <div className='row' style={{paddingTop: "50px"}}>
                <div className='col-md-4'>
                        <label className="form_label" for="documentType">Document Type </label><br></br>
                        <select className="form_input" id="documentType" value={documentType} onChange = {(e) => handleInputChange(e)}>
                            <option value={"0"}>-Select-</option>
                            <option value={"Degree Certificate"}>Degree Certificate</option>
                            <option value={"Provisional Certificate"}>Provisional Certificate</option>
                            <option value={"Consolidated Marks Sheet"}>Consolidated Marks Sheet</option>
                        </select>
                </div>
                <div className='col-md-4' style={{paddingTop: "25px"}}>
                    <input  type="file" name="" id="filePath" onChange = {(e) => handleInputChange(e)}/>
                </div>
                <div className='col-md-4' style={{paddingTop: "25px"}}>
                    <button variant="primary" onClick={(e)=>handleSaveSubmit(e)} type="submit" class="btn_add_document">Save Document</button>
                </div>
              </div>

            <Table responsive bordered hover>
                <thead>
                    <tr>
                        <th>Document Type</th>
                        <th>File Path</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {gridData.map(d =>
                        <tr key = {d.id}>
                            <td>{d.documentType}</td>
                            <td>{d.filePath}</td>
                            <td>
                                <span style={{fontSize: "large", cursor: 'pointer', color: '#785fa0'}}><FaFileDownload /> Download</span>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            </div>
            </div>
    )
}

export default Document;