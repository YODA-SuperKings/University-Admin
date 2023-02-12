import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';

function AffiliatedColleges()
{
    const [gridData, setGridData] = useState([]);
    const getAffiliatedColleges= (id) => {
        fetch('https://localhost:44343/api/AffiliatedColleges/GetAffiliatedColleges', 
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
        getAffiliatedColleges();
     }, [])

    return(
        <div className="form-affiliatedColleges">
            <div><h1 className='document_header'>Affiliated Colleges</h1></div>
            <div className="form-affiliatedColleges-body">
            <Table responsive bordered hover variant="light">
                <thead>
                    <tr>
                        <th>District</th>
                        <th>Government Colleges</th>
                        <th>Aided Colleges</th>
                        <th>SelfFinanced Colleges</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {gridData.map(d =>
                        <tr key = {d.id}>
                            <td>{d.district}</td>
                            <td>{d.government}</td>
                            <td>{d.aided}</td>
                            <td>{d.selfFinanced}</td>
                            <td>{parseInt(d.government) + parseInt(d.aided) + parseInt(d.selfFinanced)}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            </div>
        </div>
    )
}

export default AffiliatedColleges;