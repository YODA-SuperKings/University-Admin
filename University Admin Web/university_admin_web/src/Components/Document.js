import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GrView } from 'react-icons/gr';
import { FaFileDownload } from 'react-icons/fa';
import { useNavigate, Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';

function Document(){
    const [modalShow, setModalShow] = React.useState(false);
    const [gridData, setGridData] = useState([]);
    const [documentType, setDocumentType] = useState(null);
    const gridVals = [{id: 1, documentType: "Professional Certificate" }]

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "documentType")
            setDocumentType(value);
    }

    const getDocumentGridData  = (e) => {
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

    useEffect(() => {
        //getDocumentGridData();
        setGridData(gridVals);
     }, [])

     const handleSaveSubmit = (e) => {
        
     }

     function AddDocumentModal(props) {
        return (
          <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Add Document
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className='row'>
                <div className='col-md-6'>
                        <label className="form_label" for="documentType">Document Type </label><br></br>
                        <select className="form_input" id="documentType" value={documentType} onChange = {(e) => handleInputChange(e)}>
                            <option value={0}>-Select-</option>
                            <option value={1}>Degree Certificate</option>
                            <option value={2}>Provisional Certificate</option>
                            <option value={3}>Consolidated Marks Sheet</option>
                        </select>
                </div>
                <div className='col-md-6' style={{paddingTop: "25px"}}>
                    <input  type="file" name="" id="documentBrowse"/>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
                <button variant="primary" onClick={(e)=>handleSaveSubmit(e)} type="submit" class="btn_add_document_save">Save</button>
                <button variant="primary" onClick={props.onHide} type="submit" class="btn_add_document_close">Close</button>
            </Modal.Footer>
          </Modal>
        );
      }
    
    return(
        <div className="form-document">
            <div><h1 className='document_header'>Documents</h1></div>
            <div className="form-document-body">
            <span style={{paddingLeft: "87%"}}></span>
            <button variant="primary" onClick={() => setModalShow(true)} type="submit" class="btn_add_document">Add Document</button>
            <AddDocumentModal show={modalShow} onHide={() => setModalShow(false)}/>
            <Table responsive bordered hover>
                <thead>
                    <tr>
                        <th>SNo.</th>
                        <th>Document Type</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {gridData.map(d =>
                        <tr key = {d.id}>
                            <td>{d.id}</td>
                            <td>{d.documentType}</td>
                            <td>
                                <div className='row'>
                                    <div className='col-sm-2'>
                                        <h3 style={{cursor:'pointer'}}><GrView/></h3>
                                    </div>
                                    <div className='col-sm-2'>
                                        <h3 style={{cursor:'pointer'}}><FaFileDownload/></h3>
                                    </div>
                                    <div className='col-sm-8'>

                                    </div>
                                </div>
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