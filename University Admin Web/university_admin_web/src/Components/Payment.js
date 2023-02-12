import React, {useState, useEffect} from 'react';
import toast from 'react-simple-toasts';
import { useNavigate } from "react-router-dom";

function Payment(){
    const navigate = useNavigate();
    const [feeType, setFeeType] = useState(null);
    const [feeTypeList, setFeeTypeList] = useState([]);
    const [feeDescription, setFeeDescription] = useState(null);
    const [academicYear, setAcademicYear] = useState("2023 - 2024");
    const [amount, setAmount] = useState(null);
    const [registrationNumber, setRegistrationNumber] = useState(localStorage.getItem('RegistrationNumber'));

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "feeType")
        {
            setFeeType(value);
            feeTypeList.find((item) => { 
                if(item.id === value) 
                    setAmount(item.amount);
            });
        }
        if(id === "feeDescription")
            setFeeDescription(value);
    }

    const getFeeType= () => {
        fetch('https://localhost:44343/api/Fee/GetFee', 
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
            setFeeTypeList(data);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    const paymentProceedApi = () => {
        const postBody = {
            RegistrationNo: registrationNumber,
            PaymentMode: "Online",
            FeeDescription: feeDescription,
            Amount: amount,
            AcademicYear: academicYear,
            FeeID: feeType
        }
        fetch('https://localhost:44343/api/Payment/CreatePayment', 
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
                toast(<><b style={{ color: 'Green' }}>{data}</b></>, { position: 'top-right' });
                console.log(data);
            })
            .catch((error) => {
                toast(<><b style={{ color: 'Red' }}>{error}</b></>, { position: 'top-right' });
                console.error(error);
            });
    }

    const proceedPayment  = (e) => {
        if(feeType === null)
        {
            toast(<><b style={{ color: 'Red' }}>Fee Type Required.</b></>, { position: 'top-right' });
        }
        if(amount === null || amount <= 0)
        {
            toast(<><b style={{ color: 'Red' }}>Amount Required.</b></>, { position: 'top-right' });
        }
        else{
            paymentProceedApi();
            navigate("/StudentPaymentDetails");
        }
    }

    const handleCancelSubmit = (e) => {
        navigate("/StudentPaymentDetails");
    }

    useEffect(() => {
        getFeeType();
     }, [])

    return(
        <div className="form-payment">
            <div><h1 className='payment_header'>Payment Details</h1></div>
            <div className="form-payment-body">
                <div className='payment_border'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <label className="form_label" for="feeType">Fee Type </label><br></br>
                            <select className="form-control" id="feeType" value={feeType} onChange = {(e) => handleInputChange(e)}>
                            <option value={0}>-Select-</option>
                            {feeTypeList.map((option) => (<option value={option.id}>{option.feeType}</option>))}
                            </select>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-4'>
                            <label className="form_label" for="feeDescription">Fee Description </label><br></br>
                            <input className="form_input" type="text" id="feeDescription" value={feeDescription} onChange = {(e) => handleInputChange(e)} placeholder="Fee Description"/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-4'>
                            <label className="form_label" for="academicYear">Academic Year </label><br></br>
                            <input className="form_input" style={{backgroundColor:'lightgrey'}} type="text" id="academicYear" value={academicYear} readOnly />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-4'>
                            <label className="form_label" for="amount">Amount </label><br></br>
                            <input className="form_input" style={{backgroundColor:'lightgrey'}} type="text" id="amount" value={amount} readOnly/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="payment_footer">
                <div style={{ paddingLeft: "80%" }}>
                    <button onClick={(e)=>proceedPayment(e)} type="submit" class="btn_payment_proceed">Proceed</button>
                    <span style={{paddingLeft: "5%"}}></span>
                    <button onClick={(e)=>handleCancelSubmit(e)} type="submit" class="btn_payment_cancel">Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default Payment;