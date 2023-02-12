import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";


function ExamTimeTable() {


    return(
        <div className="form-affiliatedColleges">
        <div>
        <div class="col">
        <div className='col-md-6'><img src={process.env.PUBLIC_URL + "/Img/UGExamTimeTable.png"} /></div>
       <img src={process.env.PUBLIC_URL + "/Img/PGExamTimeTable.png"} />
        </div>
        </div>
        </div>
    )
}

export default ExamTimeTable;