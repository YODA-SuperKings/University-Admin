import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
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
    const gridVals = [{id: 1, RegistratioNumber: "KEC12457885", CandidateName: "Jim", CourseOrBranch: "B.E ECE", MonthAndYearOfPassing: "05/2015", Status: "Verified" },
    {id: 2, RegistratioNumber: "KEC12457887", CandidateName: "Carey", CourseOrBranch: "B-Tech IT", MonthAndYearOfPassing: "07/2014", Status: "Not Verified" }]

    const gridCVDocumentVals = [{id: 1, documentType: "Professional Certificate" }]

    const getCertificateVerificationGridData  = (e) => {
        fetch('https://localhost:44342/api/Student/GetStudents', 
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

    const rowData = (id, RegistratioNumber, CandidateName, CourseOrBranch, MonthAndYearOfPassing) => {
        setRegistrationNumber(RegistratioNumber);
        setCandidateName(CandidateName);
        setCourseBranch(CourseOrBranch);
        setMonthAndYearOfPassing(MonthAndYearOfPassing);
        setGridCVDocumentData(gridCVDocumentVals);
        setModalShow(true);
    }

    const Accept = () => {

    }

    const Reject = () => {

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
                        <th>SNo.</th>
                        <th>Document Type</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {gridCVDocumentData.map(d =>
                        <tr key = {d.id}>
                            <td>{d.id}</td>
                            <td>{d.documentType}</td>
                            <td>
                                <button variant="primary" type="submit" class="btn_CVDocument_view">View</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            </Modal.Body>
            <Modal.Footer>
                <button variant="primary" onClick={(e)=>Accept(e)} type="submit" class="btn_certificateVerification_accept">Accept</button>
                <button variant="primary" onClick={(e)=>Reject(e)} type="submit" class="btn_certificateVerification_reject">Reject</button>
            </Modal.Footer>
          </Modal>
        );
      }

      useEffect(() => {
        //getCertificateVerificationGridData();
        setGridData(gridVals);
     }, [])

    return(
        <div className="form-certificateVerification">
            <div><h1 className='document_header'>Certificate Verification</h1></div>
            <div className="form-document-body">
            <span style={{paddingLeft: "87%"}}></span>
            <Table id="tblGridCetificateVerification" responsive bordered hover>
                <thead>
                    <tr>
                        <th>SNo.</th>
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
                            <td>{d.id}</td>
                            <td>{d.RegistratioNumber}</td>
                            <td>{d.CandidateName}</td>
                            <td>{d.CourseOrBranch}</td>
                            <td>{d.MonthAndYearOfPassing}</td>
                            <td>{d.Status}</td>
                            <td>
                                <button variant="primary" onClick={() => rowData(d.id, d.RegistratioNumber, d.CandidateName, d.CourseOrBranch, d.MonthAndYearOfPassing)} type="submit" class="btn_certificateVerification_view">View</button>
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
