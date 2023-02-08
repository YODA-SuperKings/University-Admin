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
            <h1>Sign Up</h1>
            <form>
                <div>
                    <label for="firstName">First Name </label><br></br>
                    <input type="text" value={firstName} onChange = {(e) => handleInputChange(e)} id="firstName" placeholder="First Name"/>
                    <label for="lastName">Last Name </label><br></br>
                    <input type="text" name="" id="lastName" value={lastName}  onChange = {(e) => handleInputChange(e)} placeholder="LastName"/>
                    <label for="password">Password </label><br></br>
                    <input type="password"  id="password" value={password} onChange = {(e) => handleInputChange(e)} placeholder="Password"/>
                    <label for="confirmPassword">Confirm Password </label><br></br>
                    <input type="password" id="confirmPassword" value={confirmPassword} onChange = {(e) => handleInputChange(e)} placeholder="Confirm Password"/>
                    <label for="email">Email </label><br></br>
                    <input type="email" id="email" value={email} onChange = {(e) => handleInputChange(e)} placeholder="Email"/>
                    <label for="registrationtype">Registration Type </label><br></br>
                    <select id="registrationtype" value={registrationtype} onChange = {(e) => handleInputChange(e)}>
                        <option value={0}>-Select-</option>
                        <option value={1}>College</option>
                        <option value={2}>Company</option>
                    </select>
                    <label for="name">{nameLabel}</label><br></br>
                    <input  type="text" id="name" value={name} onChange = {(e) => handleInputChange(e)} placeholder={nameLabel}/>
             
                <button onClick={()=>handleSubmit()} type="submit" className="loginbutton">REGISTER</button>
                <p className="para-2">Already have an account ? <span style={{paddingLeft: "17%"}}></span> <Link to="/">Sign In</Link></p>
            </div>
            </form>
        </div>
    )
} 

export default Registration