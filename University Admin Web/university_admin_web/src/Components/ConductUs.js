import React from "react";
const ConductUs = () => {
return (
	<div>
   <div class="form-department">
        <h1 className="contactusheader" style={{marginLeft: "10%"}}>How To Reach Us</h1>
        <div className="row">
          <div className="col">
          <h3 class="elementor-image-box-title">Address</h3>
          <div class="col-lg-6">
          <p class="elementor-image-box-description">MMSC UNIVERSITY<br/>
              Chrompet,<br/>
              Chennai- 600 028<br/>
              Tamil Nadu, India
            </p>
              <h3 className="elementor-image-box-title">Call Us At</h3>
              <p class="elementor-image-box-description">Phone: +91 - 44-2229 0742, 2229 0125, <br/>Fax: +91-44-2229 3886  </p>
          </div>
          </div>
          <div className="col">
            <img src={process.env.PUBLIC_URL + "/Img/map1.png"} />
          </div>
    </div>
   </div>
  </div>
)
};
export default ConductUs;
