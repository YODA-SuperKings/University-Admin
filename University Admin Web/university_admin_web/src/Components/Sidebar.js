import React, {useState} from 'react';
import { FaBars, FaTh, FaUserAlt, FaUserGraduate, FaSignOutAlt } from 'react-icons/fa';
import { MdOutlinePayment } from 'react-icons/md';
import { HiDocumentDuplicate } from 'react-icons/hi';
import { AiOutlineLogin } from 'react-icons/ai';
import { GrHomeRounded } from 'react-icons/gr';
import { TbFileCertificate } from 'react-icons/tb';
import { NavLink } from 'react-router-dom';
import Login from './Login';

const menuItem = [
    {
        path: "/Home",
        name: "Home",
        icon: <GrHomeRounded/>
    },
    /*--------Admission---------------------*/
    {
        path: "/AdmissionForm",
        name: "Admission",
        icon: <FaTh/>
    },
    {
        path: "/ProgramsOffered",
        name: "Programs Offered",
        icon: <GrHomeRounded/>
    },
    {
        path: "/AffiliatedColleges",
        name: "Affiliated Colleges",
        icon: <GrHomeRounded/>
    },
    {
        path: "/Syllabus",
        name: "Syllabus",
        icon: <GrHomeRounded/>
    },
    {
        path: "/FeeStructure",
        name: "Fee Structure",
        icon: <GrHomeRounded/>
    },
    {
        path: "/HolidayCalendar",
        name: "Holiday Calendar",
        icon: <GrHomeRounded/>
    },
    {
        path: "/CertificateVerfication",
        name: "Certificate Verfication", 
        icon: <TbFileCertificate/>
    },
    /*------------------Admission End--------------------------*/
    /*------------------People--------------------------*/

     /*------------------Staff--------------------------*/
     {
        path: "/Department",
        name: "Department",
        icon: <MdOutlinePayment/>
    },
    {
        path: "/StudentInformation",
        name: "Student Details",
        icon: <FaUserAlt/>
    },
    {
        path: "/StudentAttendance",
        name: "Student Attendance",
        icon: <FaUserAlt/>
    },
    {
        path: "/StudentModelPaper",
        name: "Model Papers",
        icon: <FaUserAlt/>
    },
    {
        path: "/Evaluation",
        name: "Exam Evaluation",
        icon: <MdOutlinePayment/>
    },
     /*------------------Student--------------------------*/
     {
        path: "/StudentProfile",
        name: "Student Profile",
        icon: <MdOutlinePayment/>
    },
    {
        path: "/Document",
        name: "Document",
        icon: <HiDocumentDuplicate/>
    },
    {
        path: "/StudentPaymentDetails",
        name: "Pay Fees",
        icon: <MdOutlinePayment/>
    },
    /*------------------People End--------------------------*/
    /*------------------Examination--------------------------*/
    {
        path: "/ExamTimeTable",
        name: "Exam Time Table",
        icon: <MdOutlinePayment/>
    },
    {
        path: "/ExamResult",
        name: "Exam Result",
        icon: <MdOutlinePayment/>
    },
     /*------------------Examination End--------------------------*/
  /*------------------Downloads--------------------------*/
  {
    path: "/HallTicketDownload",
    name: "Hall Ticket Download",
    icon: <MdOutlinePayment/>
},
{
    path: "/MarkSheetDownload",
    name: "Mark Sheet Download",
    icon: <MdOutlinePayment/>
},
 /*------------------Downloads End--------------------------*/
    {
        path: "/Login",
        name: "Log In",
        icon: <AiOutlineLogin/>
    },
    {
        path: "/",
        name: "Log out",
        icon: <FaSignOutAlt/>
    }
    
]

function Sidebar({children}){
    debugger;
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);
    const [components, setComponents] = useState(["Sample Component"]); 
    const menuItemFinal = [];
    let tempmenu = []
    let loginType = localStorage.getItem("LoginType");

    function dummyClick(){
        debugger;
        setComponents([...components, "Sample Component"]) 
    }
    
    tempmenu = ["Home","Admission","Programs Offered","Affiliated Colleges","Syllabus","Fee Structure","Holiday Calendar","Department","Pay Fees","Exam Time Table","Exam Result","Log In"]
    if(loginType === 1)
    {
        tempmenu = ["Home","Admission","Programs Offered","Affiliated Colleges","Syllabus","Fee Structure","Holiday Calendar","Certificate Verfication","Department",
        "Student Details","Student Attendance","Model Papers","Exam Evaluation","Student Profile","Document","Pay Fees","Exam Time Table","Exam Result","Hall Ticket Download",
        "Mark Sheet Download","Log out"]
    }
    else  if(loginType === 2 || loginType === 3)
    {
        tempmenu = ["Certificate Verfication","Department","Student Details","Student Attendance","Model Papers","Exam Evaluation","Document","Log out"]
    }
    else  if(loginType === 4)
    {
        tempmenu = ["Certificate Verfication","Model Papers","Student Profile","Document","Pay Fees","Exam Time Table","Exam Result","Hall Ticket Download","Mark Sheet Download","Log out"]
    }

    menuItem.forEach(mi => {
        tempmenu.forEach(item =>{
            if(item === mi.name){
                menuItemFinal.push(mi);
            }
        })
    });

    return(
      <div className='Sidebar_container'>
        <div style={{width: isOpen ? "250px" : "50px"}} className='sidebar'>
            <div className='topSection'>
                <h1 style={{display: isOpen ? "block" : "none"}} className='logo'><FaUserGraduate/></h1>
                <div style={{marginLeft: isOpen ? "150px" : "0px", cursor:'pointer'}} className='bars'>
                    <FaBars onClick={toggle}/>
                    <button onClick={dummyClick} text="Call Component"/> 
                </div>
            </div>
            {
                menuItemFinal.map((item,index) => (
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