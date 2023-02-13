import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import { FcApproval } from 'react-icons/fc';
function StudentModelPaper(){
  const navigate = useNavigate();
  const [gridData, setGridData] = useState([]);

const downloadModelPaper = (Subject) => {
 
   fetch('ModelPaper ' + Subject +'.pdf')
   .then(response => {
        response.blob().then(blob => {
            const fileURL = window.URL.createObjectURL(blob);
            let alink = document.createElement('a');
            alink.href = fileURL;
            alink.download = 'ModelPaper ' + Subject  +'.pdf';
            alink.click();
        })
    })
    }

    const getModelPaperGridData  = (e) => {
        fetch('https://localhost:44343/api/Syllabus/GetSyllabusByID?semesterType=I', 
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
       getModelPaperGridData();
     }, [])
    
    return(
        <div className="form-payment">
            <div><h1 className='document_header'>Model Paper</h1></div>
            <div className="form-payment-body">
             <Table responsive bordered hover variant="light">
                <thead>
                    <tr>
                        <th>S No</th>
                        <th>Subject</th>
                     </tr>
                </thead>
                <tbody>
                    {
                    gridData.map((d, index )=>
                        <tr key = {d.id}>
                            <td>{index + 1}</td>
                            <td><span style={{fontSize: "large", cursor: 'pointer', color: '#785fa0'}}> {d.courseTitle}<FcApproval onClick={() => downloadModelPaper(d.courseTitle)}/></span>                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            </div>
            <div className="payment_footer">
                
            </div>
        </div>
    )
}

export default StudentModelPaper;