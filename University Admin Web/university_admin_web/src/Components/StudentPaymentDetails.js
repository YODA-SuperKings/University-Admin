import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { AiOutlineDownload } from 'react-icons/ai';
import Table from 'react-bootstrap/Table';

function StudentPaymentDetails(){
    const navigate = useNavigate();
    const [studentName, setStudentName] = useState("Jim Carey");
    const [registrationNumber, setRegistrationNumber] = useState(12345);
    const [gridData, setGridData] = useState([]);
    const gridVals = [{id: 1, Date: "01/01/2023", PaymentMode: "Online", FeesDescription: "Term Fee - 1", AmountPaid: "94000", AcademicYear: "2022 - 2023" },
    {id: 2, Date: "01/02/2023", PaymentMode: "Online", FeesDescription: "Term Fee - 2", AmountPaid: "54000", AcademicYear: "2022 - 2023" }]

    const getPaymentHistoryGridData  = (e) => {
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
        //getPaymentHistoryGridData();
        setGridData(gridVals);
     }, [])

    return(
        <div className="form-payment">
            <div><h1 className='payment_header'>Payment Details</h1></div>
            <div className="form-payment-body">
                <div className='payment_border'>
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
                </div>
                <br></br>
                <span style={{paddingLeft: "87%"}}></span>
                <button variant="primary" onClick={() => navigate("/Payment")} type="submit" class="btn_add_document">Pay Fees</button>
                <Table id="tblGridCetificateVerification" responsive bordered hover>
                <thead>
                    <tr>
                        <th>SNo.</th>
                        <th>Date</th>
                        <th>Payment Mode</th>
                        <th>Fees Description</th>
                        <th>Amount Paid</th>
                        <th>Academic Year</th>
                        <th>Receipt</th>
                    </tr>
                </thead>
                <tbody>
                    {gridData.map(d =>
                        <tr key = {d.id}>
                            <td>{d.id}</td>
                            <td>{d.Date}</td>
                            <td>{d.PaymentMode}</td>
                            <td>{d.FeesDescription}</td>
                            <td>{d.AmountPaid}</td>
                            <td>{d.AcademicYear}</td>
                            <td>
                                <span style={{fontSize: "large", cursor: 'pointer', color: '#785fa0'}}><AiOutlineDownload/> Download</span>
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

export default StudentPaymentDetails;