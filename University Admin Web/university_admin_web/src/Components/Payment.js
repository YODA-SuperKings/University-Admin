import React, {useState} from 'react';
import toast from 'react-simple-toasts';
import { useNavigate, Link } from "react-router-dom";

function Payment(){
    const [cardNumber, setCardNumber] = useState(null);
    const [cvvNumber, setCvvNumber] = useState(null);
    const [paymentAmount, setPaymentAmount] = useState(0);

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "cardNumber")
            setCardNumber(value);
        if(id === "cvvNumber")
            setCvvNumber(value);
        if(id === "paymentAmount")
            setPaymentAmount(value);
    }

    const proceedPayment  = (e) => {
        if(cardNumber === null || cardNumber === "")
        {
            toast(<><b style={{ color: 'Red' }}>Card Number Required.</b></>, { position: 'top-right' });
        }
        else if(cvvNumber === null || cvvNumber === "")
        {
            toast(<><b style={{ color: 'Red' }}>CVV Number Required.</b></>, { position: 'top-right' });
        }
        else if(paymentAmount === null || paymentAmount === "")
        {
            toast(<><b style={{ color: 'Red' }}>Payment Amount Required.</b></>, { position: 'top-right' });
        }
        else{

        }
    }

    const handleCancelSubmit = (e) => {

    }

    return(
        <div className="form-payment">
            <div>
                <span style={{paddingLeft: "95%"}}></span>
                <Link to={"/"}>Log out</Link>
            </div>
            <div><h1 className='payment_header'>Payment Details</h1></div>
            <div className="form-payment-body">
                <div className='payment_border'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <label className="form_label" for="cardNumber">Card Number </label><br></br>
                            <input className="form_input" type="number" id="cardNumber" value={cardNumber} onChange = {(e) => handleInputChange(e)} placeholder="Card Number"/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-4'>
                            <label className="form_label" for="cvvNumber">CVV Number </label><br></br>
                            <input className="form_input" type="number" id="cvvNumber" value={cvvNumber} onChange = {(e) => handleInputChange(e)} placeholder="CVV Number"/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-4'>
                            <label className="form_label" for="paymentAmount">Payment Amount </label><br></br>
                            <input className="form_input" type="number" id="paymentAmount" value={paymentAmount} onChange = {(e) => handleInputChange(e)} placeholder="Payment Amount"/>
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