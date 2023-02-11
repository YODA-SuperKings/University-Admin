
function Banner() {
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
      <div className="shadow-sm p-1 mb-1 marq">
        <marquee direction = "left" loop="" >
           <div> 1.ADMISSIONS OPEN UG & PG-2023-APPLY NOW  | 2.Alumni Meet (2023)-19th Alumni Meet- Registration Form |
                        3.MMSC 20th Graduation Day | 4.The last date for payment of admission fee for PG candidates extended upto 17-02-2023.|
                        5.Recruitment for Enginnering candidates</div> 
          </marquee>
      </div>
    </div>
    );
  }
  
  export default Banner;