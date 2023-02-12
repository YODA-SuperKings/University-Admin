import React, {useState, useEffect} from 'react';
import { GrDocumentPdf } from 'react-icons/gr';
import { useNavigate } from "react-router-dom";


function HolidayCalendar() {

 const downloadHolidayCalender = () => {
        fetch('MMSCHolidayCalender.pdf').then(response => {
            response.blob().then(blob => {
                const fileURL = window.URL.createObjectURL(blob);
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = 'MMSCHolidayCalender.pdf';
                alink.click();
            })
        })
    }
      

    return(
        <div style={{marginLeft: "277px"}}>
          <h1><span style={{fontSize: "large", cursor: 'pointer', color: 'rgb(255 255 255)'}} onClick={downloadHolidayCalender}><GrDocumentPdf/> Holiday Calendar Download</span></h1>
          <img src={process.env.PUBLIC_URL + "/Img/holidaycalendar.jpg"} />
        </div>
    )
}

export default HolidayCalendar;