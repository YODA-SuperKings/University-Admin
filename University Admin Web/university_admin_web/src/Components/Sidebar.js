import React, {useState} from 'react';
import { FaBars, FaTh, FaUserAlt, FaUserGraduate } from 'react-icons/fa';
import { MdOutlinePayment } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

const menuItem = [
    {
        path: "/AdmissionForm",
        name: "Admission Form",
        icon: <FaTh/>
    },
    {
        path: "/StudentInformation",
        name: "Student Information",
        icon: <FaUserAlt/>
    },
    {
        path: "/Payment",
        name: "Payment",
        icon: <MdOutlinePayment/>
    }
]

function Sidebar({children}){
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);
    return(
      <div className='Sidebar_container'>
        <div style={{width: isOpen ? "200px" : "50px"}} className='sidebar'>
            <div className='topSection'>
                <h1 style={{display: isOpen ? "block" : "none"}} className='logo'><FaUserGraduate/></h1>
                <div style={{marginLeft: isOpen ? "100px" : "0px"}} className='bars'>
                    <FaBars onClick={toggle}/>
                </div>
            </div>
            {
                menuItem.map((item,index) => (
                    <NavLink to={item.path} key={index} className="link" activeClassName="active">
                        <div className='icon'>{item.icon}</div>
                        <div style={{display: isOpen ? "block" : "none"}} className='linkText'>{item.name}</div>
                    </NavLink>
                ))
            }
        </div>
        <main>{children}</main>
      </div>
    )
}

export default Sidebar;