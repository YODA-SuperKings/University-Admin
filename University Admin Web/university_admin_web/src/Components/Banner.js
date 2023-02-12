import React, {useEffect} from 'react';
import { useNavigate } from "react-router-dom";
function Banner() {
  const navigate = useNavigate();
  useEffect(() => {
    if(window.location.pathname === '/')
    {
      navigate("/Home");
    }
 }, [])
 
    return (
    <div>
      <div className="row shadow-sm p-1 mb-1 university_banner">
        <div className="col-md-4">
          <div style={{width: "35%", height: "35%"}}>
            <img src={process.env.PUBLIC_URL + "/Img/logo.png"} />
          </div>
        </div>
        <div className="col-md-8">
          <h1 className="universityheader text-nowrap"> MMSC University, Chennai</h1>
        </div>
      </div>
    </div>
    );
  }
  
  export default Banner;