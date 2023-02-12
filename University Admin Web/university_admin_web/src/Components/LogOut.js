import React, {useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import toast from 'react-simple-toasts';

function LogOut(){
    const navigate = useNavigate();
    useEffect(() => {
        debugger;
        localStorage.removeItem("LoginType");
        localStorage.setItem("authenticated", false);
        navigate("/Home");
        window.location.reload();
     }, [])
    return(
        <div></div>
    )
}

export default LogOut;