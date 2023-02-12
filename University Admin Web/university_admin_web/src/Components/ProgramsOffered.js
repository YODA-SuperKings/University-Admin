import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

function ProgramsOffered() {
    debugger;

    const [gridData, setGridData] = useState([]);
    
    const getCollegeInfoGridData  = (e) => {
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
            setGridData(data);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        getCollegeInfoGridData();
     }, [])

     
     const [expanded, setExpanded] = useState(true);
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
                gridData.map((item,index) => (
                 <li>{item.courseName}</li>
                )) 
               } 
               </ul>}
             </div>
            </article>
        </div>
    );
}

export default ProgramsOffered;