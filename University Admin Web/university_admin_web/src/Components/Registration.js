import React, {useState} from 'react';
import { Link } from "react-router-dom";
import toast from 'react-simple-toasts';
import { useNavigate } from "react-router-dom";

function Registration(){
    const navigate = useNavigate();
    const [code, setCode] = useState(null);
    const [nameOfInstitute, setNameOfInstitute] = useState(null);
    const [userName, setUserName] = useState(null);
    const [password,setPassword] = useState(null);
    const [confirmPassword,setConfirmPassword] = useState(null);
    const [email, setEmail] = useState(null);
    const [phoneNumber,setPhoneNumber] = useState(null);
    const [address,setAddress] = useState(null);
    const [city,setCity] = useState(null);
    const [district,setDistrict] = useState(null);
    const [zipCode,setZipCode] = useState(null);
    const [state,setState] = useState(null);
    const [type,setType] = useState(null);

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "code")
            setCode(value);
        if(id === "nameOfInstitute")
            setNameOfInstitute(value);
        if(id === "userName")
            setUserName(value);
        if(id === "password")
            setPassword(value);
        if(id === "confirmPassword")
            setConfirmPassword(value);
        if(id === "email")
            setEmail(value);
        if(id === "phoneNumber")
            setPhoneNumber(value);
        if(id === "address")
            setAddress(value);
        if(id === "city")
            setCity(value);
        if(id === "district")
            setDistrict(value);
        if(id === "zipCode")
            setZipCode(value);
        if(id === "state")
            setState(value);
        if(id === "type")
            setType(value);
    }

    const addRegistration = () => {
        let toastColor = '';
        const postBody = {
            Code: code,
            NameofInstitute: nameOfInstitute,
            UserName: userName,
            Email: email,
            PhoneNumber: phoneNumber,
            Address: address,
            City: city,
            District: district,
            State: state,
            ZipCode: zipCode,
            Type: type
        };
        fetch('https://localhost:44343/api/CollegeRegistration/CreateCollegeRegistration', 
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
            if(data === "Email already exists." || data === "Code already exists.")
                toastColor = 'Red';
            else{
                toastColor = 'Green';
                addUser();
            }
            toast(<><b style={{ color: toastColor }}>{data}</b></>, { position: 'top-right' });
            console.log(data);
        })
        .catch((error) => {
            toast(<><b style={{ color: 'Red' }}>{error}</b></>, { position: 'top-right' });
            console.error(error);
        });
     };

    const Register  = () => {
        if(code === null || code === "")
        {
            toast(<><b style={{ color: 'Red' }}>Code Required.</b></>, { position: 'top-right' });
        }
        else if(nameOfInstitute === null || nameOfInstitute === "")
        {
            toast(<><b style={{ color: 'Red' }}>Name Of Institue Required.</b></>, { position: 'top-right' });
        }
        else if(userName === null || userName === "")
        {
            toast(<><b style={{ color: 'Red' }}>User Name Required.</b></>, { position: 'top-right' });
        }
        else if(password === null || password === "")
        {
            toast(<><b style={{ color: 'Red' }}>Password Required.</b></>, { position: 'top-right' });
        }
        else if(confirmPassword === null || confirmPassword === "")
        {
            toast(<><b style={{ color: 'Red' }}>Confirm Password Required.</b></>, { position: 'top-right' });
        }
        else if(((password !== null || password !== "") && (confirmPassword !== null || confirmPassword !== "")) && password !== confirmPassword){
            toast(<><b style={{ color: 'Red' }}>Password & Confirm Password not matching.</b></>, { position: 'top-right' });
        }
        else if(email === null || email === "")
        {
            toast(<><b style={{ color: 'Red' }}>Email Required.</b></>, { position: 'top-right' });
        }
        else if(phoneNumber === null)
        {
            toast(<><b style={{ color: 'Red' }}>Phone Number Required.</b></>, { position: 'top-right' });
        }
        else if(address === null || address === "")
        {
            toast(<><b style={{ color: 'Red' }}>Address Required.</b></>, { position: 'top-right' });
        }
        else if(city === null || city === "")
        {
            toast(<><b style={{ color: 'Red' }}>City Required.</b></>, { position: 'top-right' });
        }
        else if(district === null || district === "")
        {
            toast(<><b style={{ color: 'Red' }}>District Required.</b></>, { position: 'top-right' });
        }
        else if(zipCode === null || zipCode === "")
        {
            toast(<><b style={{ color: 'Red' }}>Zip Code Required.</b></>, { position: 'top-right' });
        }
        else if(state === null || state === "")
        {
            toast(<><b style={{ color: 'Red' }}>State Required.</b></>, { position: 'top-right' });
        }
        else if(type === null || type === "")
        {
            toast(<><b style={{ color: 'Red' }}>State Required.</b></>, { position: 'top-right' });
        }
        else{
            addRegistration();
            navigate("/Home");
        }
    }

    const addUser = () => {
        const postBody = {
            UserName: userName,
            Email: email,
            Password:password,
            ConfirmPassword: confirmPassword
        };
        fetch('https://localhost:44343/api/Users/CreateUser', 
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
            console.log(data);
        })
        .catch((error) => {
            toast(<><b style={{ color: 'Red' }}>{error}</b></>, { position: 'top-right' });
            console.error(error);
        });
    }
    
    return(
        <div className="registrationpnl">
            <h1  className='document_header'>Registration</h1>
            <div className="form-registration-body">
                <div className='row'>
                    <div className='col-md-6'>
                        <label class="form_label" for="code">Code </label><br/>
                        <input type="text" class="form-control" id="code" value={code} onChange = {(e) => handleInputChange(e)} placeholder="Code"/>
                    </div>
                    <div className='col-md-6'>
                        <label class="form_label" for="nameOfInstitute">Institute Name</label><br/>
                        <input type="text" class="form-control" id="nameOfInstitute" value={nameOfInstitute} onChange = {(e) => handleInputChange(e)} placeholder="Institute Name"/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <label class="form_label" for="userName">User Name </label><br/>
                        <input type="text" class="form-control" id="userName" value={userName} onChange = {(e) => handleInputChange(e)} placeholder="User Name"/>
                    </div>
                    <div className='col-md-6'>
                        <label class="form_label" for="password">Password </label><br/>
                        <input type="password" class="form-control" id="password" value={password} onChange = {(e) => handleInputChange(e)} placeholder="Password"/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                    <label class="form_label" for="confirmPassword">Confirm Password </label><br/>
                        <input type="password" class="form-control" id="confirmPassword" value={confirmPassword} onChange = {(e) => handleInputChange(e)} placeholder="Confirm Password"/>
                    </div>
                    <div className='col-md-6'>
                        <label class="form_label" for="email">Email </label><br/>
                        <input type="email" class="form-control" id="email" value={email} onChange = {(e) => handleInputChange(e)} placeholder="Email"/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <label class="form_label" for="phoneNumber">Phone Number </label><br/>
                        <input type="number" class="form-control" id="phoneNumber" value={phoneNumber} onChange = {(e) => handleInputChange(e)} placeholder="Phone Number"/>
                    </div>
                    <div className='col-md-6'>
                        <label class="form_label" for="address">Address </label><br/>
                        <input type="text" class="form-control" id="address" value={address} onChange = {(e) => handleInputChange(e)} placeholder="Address"/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                    <label class="form_label" for="city">City </label><br/>
                        <input type="text" class="form-control" id="city" value={city} onChange = {(e) => handleInputChange(e)} placeholder="City"/>
                    </div>
                    <div className='col-md-6'>
                    <label class="form_label" for="district">District </label><br/>
                        <input type="text" class="form-control" id="district" value={district} onChange = {(e) => handleInputChange(e)} placeholder="District"/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <label class="form_label" for="zipCode">Zip Code </label><br/>
                        <input type="text" class="form-control" id="zipCode" value={zipCode} onChange = {(e) => handleInputChange(e)} placeholder="Zip Code"/>
                    </div>
                    <div className='col-md-6'>
                        <label class="form_label" for="state">State </label><br/>
                        <input type="text" class="form-control" id="state" value={state} onChange = {(e) => handleInputChange(e)} placeholder="State"/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <label class="form_label" for="type">Type </label><br/>
                        <select className="form-control" id="type" value={type} onChange = {(e) => handleInputChange(e)}>
                            <option value={"0"}>-Select-</option>
                            <option value={"Self Finance"}>Self Finance</option>
                            <option value={"Aided"}>Aided</option>
                            <option value={"Government"}>Government</option>
                        </select>
                    </div>
                    <div className='col-md-6'></div>
                </div>
                <div className='col-md-6'>
                    <label class="form_label" for="type"></label><br/>
                    <button onClick={(e)=>Register(e)} type="submit" style={{width: "21%",marginLeft: "298px"}} class="btn_register">Submit</button>
                </div>
            </div>
        </div>
    )
} 

export default Registration