import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import toast from 'react-simple-toasts';
import Sidebar from './Sidebar';

function Login(props){
    const navigate = useNavigate();
    const [email, setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "email"){
            setEmail(value);
        }
        if(id === "password"){
            setPassword(value);
        }
    }

    const handleSubmit  = (e) => {
        e.preventDefault()
        fetch('https://localhost:44343/api/Users/AuthenticateUser?username='+email+'&password=' + password, 
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
            if (data !== 0) {
                debugger;
                toast(<><b style={{ color: 'Green' }}>Login Succesfully.</b></>, { position: 'top-right' });
                setauthenticated(true)
                localStorage.setItem("authenticated", true);
                localStorage.setItem('LoginType', data);
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
            <img src={process.env.PUBLIC_URL + "/Img/user.png"}  className="img_sec"/>
            <label for="email"  class="form_label">Email </label><br/>
            <input  type="email" class="form-control" id="email" value={email} onChange = {(e) => handleInputChange(e)} placeholder="Email"/><br/>
            <label for="password" class="form_label">Password </label><br/>
            <input type="password" class="form-control" id="password" value={password} onChange = {(e) => handleInputChange(e)} placeholder="Password"/><br/>
            <button style={{width: "100%"}} onClick={(e)=>handleSubmit(e)} type="button" class="btn_student_save">SIGN IN</button>
            <div style={{margin: "10px"}}>
              <Link to="/Registration">Sign Up</Link>
              <Link style={{marginLeft: "52%"}}>Forgot Password ?</Link>
            </div>
            </div>
        </div>
    )
} 

export default Login