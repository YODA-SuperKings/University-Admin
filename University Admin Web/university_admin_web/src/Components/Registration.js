import React, {useState} from 'react';
import { Link } from "react-router-dom";
import toast from 'react-simple-toasts';
import { useNavigate } from "react-router-dom";

function Registration(){
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [confirmPassword,setConfirmPassword] = useState(null);
    const [registrationtype,setRegistrationType] = useState(null);
    const [nameLabel,setNameLabel] = useState("Name");
    const [name,setName] = useState(null);

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "firstName")
            setFirstName(value);
        if(id === "lastName")
            setLastName(value);
        if(id === "email")
            setEmail(value);
        if(id === "password")
            setPassword(value);
        if(id === "confirmPassword")
            setConfirmPassword(value);
        if(id === "registrationtype")
        {
            setRegistrationType(value);
            if(value === "1")
                setNameLabel("Institute Name");
            else if(value === "2")
                setNameLabel("Company Name");
        }
        if(id === "name")
            setName(value);
    }

    const addUser = () => {
        let toastColor = '';
        const postBody = {
            FirstName: firstName,
            LastName: lastName,
            Password: password,
            ConfirmPassword: confirmPassword,
            Email: email,
            RegistrationType: parseInt(registrationtype),
            Name: name
        };
        fetch('https://localhost:44342/api/Users/CreateUser', 
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
            if(data === "User email already exists.")
                toastColor = 'Red';
            else
                toastColor = 'Green';
            toast(<><b style={{ color: toastColor }}>{data}</b></>, { position: 'top-right' });
            console.log(data);
        })
        .catch((error) => {
            toast(<><b style={{ color: 'Red' }}>{error}</b></>, { position: 'top-right' });
            console.error(error);
        });
     };

    const handleSubmit  = () => {
        if(firstName === null || firstName === "")
        {
            toast(<><b style={{ color: 'Red' }}>First Name Required.</b></>, { position: 'top-right' });
        }
        else if(lastName === null || lastName === "")
        {
            toast(<><b style={{ color: 'Red' }}>Last Name Required.</b></>, { position: 'top-right' });
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
        else if(registrationtype === null)
        {
            toast(<><b style={{ color: 'Red' }}>Registration Type Required.</b></>, { position: 'top-right' });
        }
        else if(name === null)
        {
            toast(<><b style={{ color: 'Red' }}>{nameLabel} Required.</b></>, { position: 'top-right' });
        }
        else{
            addUser();
            navigate("/");
        }
    }
    
    return(
        <div className="signup-box">
          <div style={{margin: " 0px 14px 0px 18px", padding: "23px 0px 23px 0px"}}>
            <label for="firstName" class="form_label">First Name </label><br/>
            <input type="text" class="form-control" value={firstName} onChange = {(e) => handleInputChange(e)} id="firstName" placeholder="First Name"/><br/>
            <label for="lastName" class="form_label">Last Name </label><br/>
            <input type="text" class="form-control" name="" id="lastName" value={lastName}  onChange = {(e) => handleInputChange(e)} placeholder="LastName"/><br/>
            <label for="password" class="form_label">Password </label><br/>
            <input type="password" class="form-control" id="password" value={password} onChange = {(e) => handleInputChange(e)} placeholder="Password"/><br/>
            <label for="confirmPassword" class="form_label">Confirm Password </label><br/>
            <input type="password" class="form-control" id="confirmPassword" value={confirmPassword} onChange = {(e) => handleInputChange(e)} placeholder="Confirm Password"/><br/>
            <label for="email" class="form_label">Email </label><br/>
            <input type="email" class="form-control" id="email" value={email} onChange = {(e) => handleInputChange(e)} placeholder="Email"/>
            <button onClick={()=>handleSubmit()} type="button" className="btn_student_save" style={{width: "100%", margin: "17px 0px 0px 0px"}}>REGISTER</button>
            <p className="para-2">Already have an account ? <span style={{paddingLeft: "17%"}}></span> <Link to="/Login">Sign In</Link></p>
          </div>
        </div>
    )
} 

export default Registration