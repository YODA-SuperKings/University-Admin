import React, {useState, useEffect} from 'react';
import { useNavigate, Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
function Department(){
    const [gridData, setGridData] = useState([]);
    const gridVals = [{id: 1, department: "IT", course: "B.Tech" }]
    const [department, setDepartment] = useState(null);
    const [course, setCourse] = useState(null);
    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "department")
        setDepartment(value);
        if(id === "course")
        setCourse(value);
    }
    useEffect(() => {
        //getDepartmentGridData();
        setGridData(gridVals);
     }, [])
     const handleSaveSubmit = (e) => {
        
     }
     const [modalShow, setModalShow] = React.useState(false);
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
                
                <div className='col-md-6' style={{paddingTop: "25px"}}>
                <div className='col-md-6'>
                <label for="department">Department</label><br></br>
                <input type="text" value={department} onChange = {(e) => handleInputChange(e)} id="department" placeholder="Department"/>
                </div>
                <div className='col-md-6'>
                <label for="course">Course</label><br></br>
                <input type="text" value={course} onChange = {(e) => handleInputChange(e)} id="course" placeholder="Course"/>
                </div>
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
       
        <div className="form-department">
        <div><h1 className='department_header'>Department Information</h1></div>
        <div className="form-department-body">
        <span style={{paddingLeft: "87%"}}></span>
            <button variant="primary" onClick={() => setModalShow(true)} type="submit" class="btn_add_document">Add Department</button>
            <AddDocumentModal show={modalShow} onHide={() => setModalShow(false)}/>
        <Table responsive bordered hover variant="light">
            <thead>
                <tr>
                    <th>Department</th>
                    <th>Course</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {gridData.map(d =>
                    <tr key = {d.id}>
                        <td>{d.department}</td>
                        <td>{d.course}</td>
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

export default Department;