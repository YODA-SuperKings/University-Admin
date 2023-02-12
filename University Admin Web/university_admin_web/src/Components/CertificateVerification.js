import React, {useState, useEffect} from 'react';
import { AiOutlineDownload } from 'react-icons/ai';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';

function CertificateVerfication(){
    const [modalShow, setModalShow] = React.useState(false);
    const [gridData, setGridData] = useState([]);
    const [gridCVDocumentData, setGridCVDocumentData] = useState([]);
    const [registrationNumber, setRegistrationNumber] = useState(null);
    const [candidateName, setCandidateName] = useState(null);
    const [courseBranch, setCourseBranch] = useState(null);
    const [monthAndYearOfPassing, setMonthAndYearOfPassing] = useState(null);

    const getCertificateVerificationGridData  = (e) => {
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
            setGridData(data);
            console.log(data);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    const getDocumentGridData  = (regNo) => {
        fetch('https://localhost:44343/api/Document/GetDocumentByID?registrationNo=' + regNo, 
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
            setGridCVDocumentData(data);
            console.log(data);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    const rowData = (id, RegistratioNumber, CandidateName, CourseOrBranch, MonthAndYearOfPassing) => {
        setRegistrationNumber(RegistratioNumber);
        setCandidateName(CandidateName);
        setCourseBranch(CourseOrBranch);
        setMonthAndYearOfPassing(MonthAndYearOfPassing);
        getDocumentGridData(RegistratioNumber);
        setModalShow(true);
    }

    const downloadDocument = () => {
        fetch('Document.pdf').then(response => {
            response.blob().then(blob => {
                const fileURL = window.URL.createObjectURL(blob);
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = 'FeeReceipt.pdf';
                alink.click();
            })
        })
    }

    const Verify = () => {
        fetch('https://localhost:44343/api/Document/UpdateDocument?registrationCode=' + registrationNumber , 
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
            getDocumentGridData();
            setModalShow(false);
            console.log(data);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    function ViewCertificateVerificationModal(props) {
        return (
          <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Verify Certificate
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className='row'>
                <div className='col-lg-4'>
                    <label className="form_label" for="registrationNumber">Registration Number </label><br></br>
                </div>
                <div className='col-md-4'>
                    <input className="form_input" style={{backgroundColor:'lightgrey'}} type="text" id="registrationNumber" readOnly value={registrationNumber}/>
                </div>
                <div className='col-md-4'></div>
              </div>
              <div style={{paddingTop: "1%"}}></div>
              <div className='row'>
                <div className='col-lg-4'>
                    <label className="form_label" for="candidateName">Candidate Name</label><br></br>
                </div>
                <div className='col-md-4'>
                    <input className="form_input" style={{backgroundColor:'lightgrey'}} type="text" id="candidateName" readOnly value={candidateName}/>
                </div>
                <div className='col-md-4'></div>
              </div>
              <div style={{paddingTop: "1%"}}></div>
              <div className='row'>
                <div className='col-lg-4'>
                    <label className="form_label" for="courseBranch">Course / Branch</label><br></br>
                </div>
                <div className='col-md-4'>
                    <input className="form_input" style={{backgroundColor:'lightgrey'}} type="text" id="courseBranch" readOnly value={courseBranch}/>
                </div>
                <div className='col-md-4'></div>
              </div>
              <div style={{paddingTop: "1%"}}></div>
              <div className='row'>
                <div className='col-lg-4'>
                    <label className="form_label" for="monthAndYearOfPassing">Month / Year Of Passing</label><br></br>
                </div>
                <div className='col-md-4'>
                    <input className="form_input" style={{backgroundColor:'lightgrey'}} type="text" id="monthAndYearOfPassing" readOnly value={monthAndYearOfPassing}/>
                </div>
                <div className='col-md-4'></div>
              </div>
              <div style={{paddingTop: "1%"}}></div>
              <Table responsive bordered hover>
                <thead>
                    <tr>
                        <th>Document Type</th>
                        <th>File Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {gridCVDocumentData.map(d =>
                        <tr key = {d.id}>
                            <td>{d.documentType}</td>
                            <td>{d.filePath}</td>
                            <td>
                                <span style={{fontSize: "large", cursor: 'pointer', color: '#785fa0'}} onClick={downloadDocument}><AiOutlineDownload/> Download</span>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            </Modal.Body>
            <Modal.Footer>
                <button variant="primary" onClick={(e)=>Verify()} type="submit" class="btn_certificateVerification_accept">Verify</button>
            </Modal.Footer>
          </Modal>
        );
      }

      useEffect(() => {
        getCertificateVerificationGridData();
     }, [])

    return(
        <div className="form-certificateVerification">
            <div><h1 className='document_header'>Certificate Verification</h1></div>
            <div className="form-document-body">
            <span style={{paddingLeft: "87%"}}></span>
            <Table id="tblGridCetificateVerification" responsive bordered hover>
                <thead>
                    <tr>
                        <th>Registration No.</th>
                        <th>Candidate Name</th>
                        <th>Course / Branch</th>
                        <th>Month & Year Of Passing</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {gridData.map(d =>
                        <tr key = {d.id}>
                            <td>{d.registrationNo}</td>
                            <td>{d.candidateName}</td>
                            <td>{d.course}</td>
                            <td>{d.graduatedYear}</td>
                            <td>{d.status}</td>
                            <td>
                                <button variant="primary" onClick={() => rowData(d.id, d.registrationNo, d.candidateName, d.course, d.graduatedYear)} type="submit" class="btn_certificateVerification_view">View</button>
                                <ViewCertificateVerificationModal show={modalShow} onHide={() => setModalShow(false)} />
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            </div>
            </div>
    )
}

export default CertificateVerfication;
