import React, {useState} from 'react';
import { FaBars, FaTh, FaUserAlt, FaUserGraduate, FaSignOutAlt } from 'react-icons/fa';
import { MdOutlinePayment } from 'react-icons/md';
import { HiDocumentDuplicate } from 'react-icons/hi';
import { TbFileCertificate } from 'react-icons/tb';
import { NavLink } from 'react-router-dom';

const menuItem = [
    {
        path: "/AdmissionForm",
        name: "Admission",
        icon: <FaTh/>
    },
    {
        path: "/StudentInformation",
        name: "Student",
        icon: <FaUserAlt/>
    },
    {
        path: "/Payment",
        name: "Payment",
        icon: <MdOutlinePayment/>
    },
    {
        path: "/Document",
        name: "Document",
        icon: <HiDocumentDuplicate/>
    },
    {
        path: "/CertificateVerfication",
        name: "Certificate Verfication",
        icon: <TbFileCertificate/>
    },
    {
        path: "/",
        name: "Log out",
        icon: <FaSignOutAlt/>
    }
]

function Sidebar({children}){
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);
    return(
      <div className='Sidebar_container'>
        <div style={{width: isOpen ? "250px" : "50px"}} className='sidebar'>
            <div className='topSection'>
                <h1 style={{display: isOpen ? "block" : "none"}} className='logo'><FaUserGraduate/></h1>
                <div style={{marginLeft: isOpen ? "150px" : "0px", cursor:'pointer'}} className='bars'>
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