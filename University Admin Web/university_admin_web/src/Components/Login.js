import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import toast from 'react-simple-toasts';

function Login(){
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
        navigate("/Sidebar");
        // e.preventDefault()
        // localStorage.setItem('LoggedInEmail', email);
        // fetch('https://localhost:44342/api/Users/AuthenticateUser?email='+email+'&password=' + password, 
        // { 
        //     method: 'GET',
        //     withCredentials: true, 
        //     crossorigin: true,
        //     headers: {
        //     Accept: 'application/json','Content-Type': 'application/json'
        //     },
        // }) 
        // .then((res) => res.json())
        // .then((data) => {
        //     if (data) {
        //         toast(<><b style={{ color: 'Green' }}>Login Succesfully.</b></>, { position: 'top-right' });
        //         setauthenticated(true)
        //         localStorage.setItem("authenticated", true);
        //         if(data.registrationType === 1)
        //             navigate("/CollegeDashboard");
        //         else if(data.registrationType === 2)
        //             navigate("/CompanyDashboard");
        //     }
        //     else
        //     {
        //         toast(<><b style={{ color: 'Red' }}>Invalid login credentials.</b></>, { position: 'top-right' });
        //     }
        // })
        // .catch((error) => {
        //     console.error(error);
        // });
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