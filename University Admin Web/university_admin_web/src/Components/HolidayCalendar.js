import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";


function HolidayCalendar() {

 const downloadHolidayCalender = () => {
        // using Java Script method to get PDF file
        fetch('MMSCHolidayCalender.pdf').then(response => {
            response.blob().then(blob => {
                // Creating new object of PDF file

                const fileURL = window.URL.createObjectURL(blob);
               // Setting various property values
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = 'MMSCHolidayCalender.pdf';
                alink.click();
            })
        })
    }
      

    return(
        <div className="form-affiliatedColleges">
        <div>
        <h1 className='affiliatedColleges_header'><span style={{fontSize: "large", cursor: 'pointer', color: '#785fa0'}} onClick={downloadHolidayCalender}> Holiday Calendar</span></h1>
        </div>
        </div>
    )
}

export default HolidayCalendar;