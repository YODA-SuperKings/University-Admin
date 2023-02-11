import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GrView } from 'react-icons/gr';
import { FaFileDownload } from 'react-icons/fa';
import { useNavigate, Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
//import FileBase64 from 'react-file-base64';

function Document(){
    const [modalShow, setModalShow] = React.useState(false);
    const [gridData, setGridData] = useState([]);
    const [documentType, setDocumentType] = useState(null);
    const gridVals = [{id: 1, documentType: "Professional Certificate" }]
    const [item, setItem] = useState({ title: '', image: '' });

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
        setGridData(gridVals);
     }, [])

    

    //  function processFile(e) {
    //    var size = file.size;
    //    var sliceSize = 20000000;
    //    var start = 0;
 
    //    setTimeout(loop, 3);
 
    //    function loop() {
    //      var end = start + sliceSize;
 
    //      if (end > size) {
    //        end = size;
    //      }
    //      var s = slice(file, start, end);
    //      send(s, start, end - 1, size);
    //      if (end < size) {
    //        start += sliceSize;
    //        setTimeout(loop, 3);
    //      }
    //    }
    //  }
 
    //  function send(piece, start, end, size) {
    //    console.log("start ", start);
    //    console.log("end", end);
 
    //    var formdata = new FormData();
    //    console.log(XUniqueUploadId);
 
    //    formdata.append("file", piece);
    //    formdata.append("cloud_name", YOUR_CLOUD_NAME);
    //    formdata.append("upload_preset", YOUR_UNSIGNED_UPLOAD_PRESET);
    //    formdata.append("public_id", "myChunkedFile2");
 
    //    var xhr = new XMLHttpRequest();
    //    xhr.open("POST", POST_URL, false);
    //    xhr.setRequestHeader("X-Unique-Upload-Id", XUniqueUploadId);
    //    xhr.setRequestHeader(
    //      "Content-Range",
    //      "bytes " + start + "-" + end + "/" + size
    //    );
 
    //    xhr.onload = function () {
    //      // do something to response
    //      console.log(this.responseText);
    //    };
 
    //    xhr.send(formdata);
    //  }
 
    //  function slice(file, start, end) {
    //    var slice = file.mozSlice
    //      ? file.mozSlice
    //      : file.webkitSlice
    //      ? file.webkitSlice
    //      : file.slice
    //      ? file.slice
    //      : noop;
 
    //    return slice.bind(file)(start, end);
    //  }

     const handleSaveSubmit = (e) => {
        debugger;
        const postBody = {
            RegistrationNo: "FC10001",
            DocumentType: documentType,
            FilePath: item.image,
        };

        //processFile(e);

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
        .catch((error) => {
        });
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
            
            <input type="text" onChange={e => setItem({ ...item, title: e.target.value })}/>
            {/* <FileBase64 type="file" multiple={false} onDone={({ base64 }) => setItem({ ...item, image: base64 })}/> */}
            {/* <button variant="primary" onClick={(e)=>ApproveCollege(e)}>Add Document</button> */}
            {/* <button variant="primary" onClick={() => setModalShow(true)} type="submit" class="btn_add_document">Add Document</button> */}
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