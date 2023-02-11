import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';

function AffiliatedColleges()
{
    const [gridData, setGridData] = useState([]);
    const gridVals = [{id: 1, district: "Chennai", government: "2", aided: "1", selfFinanced: "11", total: "14" },{id: 2, district: "Coimbatore", government: "5", aided: "7", selfFinanced: "3", total: "15" }]
    useEffect(() => {
        setGridData(gridVals);
     }, [])
    return(
        <div className="form-affiliatedColleges">
            <div><h1 className='affiliatedColleges_header'>Affiliated Colleges</h1></div>
            <div className="form-affiliatedColleges-body">
            <Table responsive bordered hover>
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
                            <td>{d.total}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            </div>
        </div>
    )
}

export default AffiliatedColleges;