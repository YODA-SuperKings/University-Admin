import React, {useState} from 'react';
import { useNavigate, Link, redirect } from "react-router-dom";
import toast from 'react-simple-toasts';

function Login(props){
    const navigate = useNavigate();
    const [UserName, setUserName] = useState(null);
    const [password,setPassword] = useState(null);
    const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "UserName"){
            setUserName(value);
        }
        if(id === "password"){
            setPassword(value);
        }
    }

    const handleSubmit  = (e) => {
        e.preventDefault()
        fetch('https://localhost:44343/api/Users/AuthenticateUser?username='+UserName+'&password=' + password, 
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
            debugger;
            if (data !== 0) {
                toast(<><b style={{ color: 'Green' }}>Login Succesfully.</b></>, { position: 'top-right' });
                setauthenticated(true)
                localStorage.setItem("authenticated", true);
                localStorage.setItem('LoginType', data);
                if(data === 2 || data === 3){
                    localStorage.setItem('UserName', UserName);
                }
                
                if(data === 4)
                    localStorage.setItem('RegistrationNumber', UserName);
                navigate("/Home");
                props.onSubmit();
            }
            else
            {
                toast(<><b style={{ color: 'Red' }}>Invalid login credentials.</b></>, { position: 'top-right' });
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }

    return(
        
        <div className="form-login">
            <div style={{margin :"0px 23px 0px 23px"}}>
            <img src={process.env.PUBLIC_URL + "/Img/user.png"}  className="img_sec"/><br/>
            <label for="UserName"  class="form_label">User Name </label><br/>
            <input  type="UserName" class="form-control" id="UserName" value={UserName} onChange = {(e) => handleInputChange(e)} placeholder="User Name"/><br/>
            <label for="password" class="form_label">Password </label><br/>
            <input type="password" class="form-control" id="password" value={password} onChange = {(e) => handleInputChange(e)} placeholder="Password"/><br/>
            <button style={{width: "100%"}} onClick={(e)=>handleSubmit(e)} type="button" class="btn_student_save">SIGN IN</button>
            </div>
        </div>
    )
} 

export default Login