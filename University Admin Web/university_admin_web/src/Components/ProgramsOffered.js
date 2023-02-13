import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { BsArrowDownRightSquare } from 'react-icons/bs'
import { useNavigate } from "react-router-dom";

function ProgramsOffered() {
    const navigate = useNavigate();
    const [ugData, setugData] = useState([]);
    const [pgData, setpgData] = useState([]);

    const ShowAdmissionForm = (e) =>{
        navigate("/AdmissionForm");
    }
    
    const getGridData  = (e) => {
        fetch('https://localhost:44343/api/ProgramsOffered/GetProgramsOffered', 
        { 
            method: 'GET',
            withCredentials: true, 
            crossorigin: true,
            headers: {
            Accept: 'application/json','Content-Type': 'application/json'
            },
        }) 
        .then((res) => res.json())
        .then((data) => {
            const tempData =[];

            data.find((item) =>{
                if (item.type === 'UG')
                {
                    tempData.push(item);
                }
            } );
            setugData(tempData);

            const tempData1 =[];
            data.find((item) =>{
                if (item.type === 'PG')
                {
                    tempData1.push(item);
                }
            } );
            setpgData(tempData1);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        getGridData();
     }, [])

     
     const [expanded, setExpanded] = useState(true);
     const [pgexpanded, setpgexpanded] = useState(true);
    return ( 
        <div style={{margin: "42px"}}>
            <article className='programspnl'>
                
              <header style={{backgroundColor: "#785fa0"}}>
              <div className='row'>
              <div className='col'>
                  <button className='btnprogram' onClick={() => setExpanded(!expanded)}>
                    {expanded ? <AiOutlineMinus /> : <AiOutlinePlus />}
                 </button>
                  </div>
                <div className='col'>
                    <h4 onClick={() => setExpanded(!expanded)} className='programspnl-title'>UG</h4>
                </div>
              </div>
             </header><br/>
             <div class="programlist">
             {expanded && <ul class="fa-ul">
               {
                ugData.map((item,index) => (
                 <li>{item.courseName}<span className='li_icon'><BsArrowDownRightSquare onClick={() => ShowAdmissionForm(item.slno)}/></span></li>
                )) 
               } 
               </ul>}
             </div>
            </article>

            <article className='programspnl'>
                
              <header style={{backgroundColor: "#785fa0"}}>
              <div className='row'>
              <div className='col'>
                  <button className='btnprogram' onClick={() => setpgexpanded(!pgexpanded)}>
                    {pgexpanded ? <AiOutlineMinus /> : <AiOutlinePlus />}
                 </button>
                  </div>
                <div className='col'>
                    <h4 onClick={() => setpgexpanded(!pgexpanded)} className='programspnl-title'>PG</h4>
                </div>
              </div>
             </header><br/>
             <div class="programlist">
             {pgexpanded && <ul class="fa-ul">
               {
                pgData.map((item,index) => (
                 <li>{item.courseName}<span className='li_icon'><BsArrowDownRightSquare onClick={() => ShowAdmissionForm(item.slno)}/></span></li>
                )) 
               } 
               </ul>}
             </div>
            </article>
        </div>
    );
}

export default ProgramsOffered;