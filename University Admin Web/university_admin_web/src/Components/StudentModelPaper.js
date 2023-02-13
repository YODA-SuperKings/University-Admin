import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { AiOutlineDownload } from 'react-icons/ai';
import Table from 'react-bootstrap/Table';
import { FcApproval } from 'react-icons/fc';
function StudentModelPaper(){
    const navigate = useNavigate();
     const [gridData, setGridData] = useState([]);
    const gridVals = [{id: 1, SNo:1, Subject: "Engg Chemistry-I", ModelPaper: "Engg Chemistry-I Model paper",},
    {id: 2, SNo:2, Subject: "Engg Graphics", ModelPaper: "Engg Graphics Model paper",},
    {id: 3, SNo:3, Subject: "Mathematics-I", ModelPaper: "Mathematics-I Model paper",},
    {id: 4, SNo:4, Subject: "Engg Physics-I", ModelPaper: "Engg Physics-I Model paper",}
 
]


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
        fetch('', 
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
        //getModelPaperGridData();
        setGridData(gridVals);
     }, [])
     const [image, setIamge] = useState([]);
     const [imageUrl, setImageUrl] = useState('');
  
   
    
    return(
        <div className="form-payment">
            <div><h1 className='payment_header'>Model Paper</h1></div>
            <div className="form-payment-body">
             <Table responsive bordered hover variant="light">
                <thead>
                    <tr>
                        <th>Sl No</th>
                        <th>Subject</th>
                        <th>Model Paper</th>
                         </tr>
                                       
                </thead>
                <tbody>
                    {gridData.map(d =>
                        <tr key = {d.id}>
                            <td>{d.SNo}</td>
                            <td>{d.Subject}</td>
                            <td>
                            <span style={{fontSize: "large", cursor: 'pointer', color: '#785fa0'}}> {d.ModelPaper}<FcApproval onClick={() => downloadModelPaper(d.Subject)}/></span>
                           
                                </td>
                            
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