
function Banner() {
    return (
    <div>
      <div class="shadow-sm p-1 mb-1 university_banner">
        <img src={process.env.PUBLIC_URL + "/Img/logo.png"} />
        <h1 className="universityheader"> MMSC University, Chennai</h1>
      </div>
      <div class="shadow-sm p-1 mb-1 marq">
      <marquee direction = "left" loop="" >
        <div>Test Message</div>
      </marquee>
      </div>
    </div>
    );
  }
  
  export default Banner;