import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";


function ExamTimeTable() {


    return(
        <div className="examtimetable">
          <img style={{width:"95%"}} src={process.env.PUBLIC_URL + "/Img/UGExamTimeTable.png"} />
          <img style={{width:"95%"}} src={process.env.PUBLIC_URL + "/Img/PGExamTimeTable.png"} />
         </div>
    )
}

export default ExamTimeTable;