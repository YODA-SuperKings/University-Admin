
function Banner() {
    return (
    <div>
      <div class="shadow-sm p-3 mb-5 university_banner">
        <img src={process.env.PUBLIC_URL + "/Img/logo.png"} />
        <h1 className="universityheader"> MSMC University, Chennai</h1>
      </div>
      <div class="shadow-sm p-3 mb-5 marq">
      <marquee direction = "left" loop="" >
        <div>Test Message</div>
      </marquee>
      </div>
    </div>
    );
  }
  
  export default Banner;