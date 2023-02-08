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
        e.preventDefault()
        localStorage.setItem('LoggedInEmail', email);
        fetch('https://localhost:44342/api/Users/AuthenticateUser?email='+email+'&password=' + password, 
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
            if (data) {
                toast(<><b style={{ color: 'Green' }}>Login Succesfully.</b></>, { position: 'top-right' });
                setauthenticated(true)
                localStorage.setItem("authenticated", true);
                if(data.registrationType === 1)
                    navigate("/CollegeDashboard");
                else if(data.registrationType === 2)
                    navigate("/CompanyDashboard");
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
        <div className="login-box">
          <h1>Login</h1>
           <form>
            <div>
               <label for="email">Email </label><br></br>
               <input  type="email" id="email" value={email} onChange = {(e) => handleInputChange(e)} placeholder="Email"/>
               <label for="password">Password </label><br></br>
               <input type="password"  id="password" value={password} onChange = {(e) => handleInputChange(e)} placeholder="Password"/>
            </div>
                <button onClick={(e)=>handleSubmit(e)} className="loginbutton" type="submit">SIGN IN</button>
                <p className="para-2"><Link to="/Registration">Sign Up</Link><span style={{paddingLeft: "32%"}}></span><Link>Forgot Password ?</Link></p>
          </form>
        </div>
    )
} 

export default Login