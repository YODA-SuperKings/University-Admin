import React, {useState} from 'react';
import { FaBars, FaTh, FaUserAlt, FaUserGraduate, FaSignOutAlt,FaDiscourse,FaUniversity,FaRegRegistered,FaRegCalendarTimes,FaRegNewspaper } from 'react-icons/fa';
import { MdOutlinePayment,MdLibraryBooks,MdOutlineHolidayVillage,MdCastForEducation } from 'react-icons/md';
import { HiDocumentDuplicate } from 'react-icons/hi';
import { AiOutlineLogin } from 'react-icons/ai';
import { BiDollar } from 'react-icons/bi';
import { FcDepartment } from 'react-icons/fc';
import { ImHome3 } from 'react-icons/im';
import { BsNewspaper } from 'react-icons/bs';
import { TiTicket } from 'react-icons/ti';
import { CgProfile } from 'react-icons/cg';
import { TbFileCertificate,TbPaperBag } from 'react-icons/tb';
import { NavLink } from 'react-router-dom';
import Login from './Login';

const menuItem = [
    {
        path: "/Home",
        name: "Home",
        icon: <ImHome3/>
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
        icon: <FaDiscourse/>
    },
    {
        path: "/AffiliatedColleges",
        name: "Affiliated Colleges",
        icon: <FaUniversity/>
    },
    {
        path: "/Syllabus",
        name: "Syllabus",
        icon: <MdLibraryBooks/>
    },
    {
        path: "/FeeStructure",
        name: "Fee Structure",
        icon: <MdOutlinePayment/>
    },
    {
        path: "/HolidayCalendar",
        name: "Holiday Calendar",
        icon: <MdOutlineHolidayVillage/>
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
        icon: <FcDepartment/>
    },
    {
        path: "/StudentInformation",
        name: "Student Details",
        icon: <FaUserAlt/>
    },
    {
        path: "/StudentAttendance",
        name: "Student Attendance",
        icon: <FaRegRegistered/>
    },
    {
        path: "/StudentModelPaper",
        name: "Model Papers",
        icon: <BsNewspaper/>
    },
    {
        path: "/Evaluation",
        name: " Exam Evaluation",
        icon: <TbPaperBag/>
    },
     /*------------------Student--------------------------*/
     {
        path: "/StudentProfile",
        name: " Student Profile",
        icon: <CgProfile/>
    },
    {
        path: "/Document",
        name: "Document",
        icon: <HiDocumentDuplicate/>
    },
    {
        path: "/StudentPaymentDetails",
        name: "Pay Fees",
        icon: <BiDollar/>
    },
    /*------------------People End--------------------------*/
    /*------------------Examination--------------------------*/
    {
        path: "/ExamTimeTable",
        name: "Exam Time Table",
        icon: <FaRegCalendarTimes/>
    },
    {
        path: "/ExamResult",
        name: "Exam Result",
        icon: <MdCastForEducation/>
    },
     /*------------------Examination End--------------------------*/
  /*------------------Downloads--------------------------*/
  {
    path: "/HallTicketDownload",
    name: "Hall Ticket Download",
    icon: <TiTicket/>
},
{
    path: "/MarkSheetDownload",
    name: "Mark Sheet Download",
    icon: <FaRegNewspaper/>
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
    },
    {
        path: "/Registration",
        name: "Registration",
        icon: <FaSignOutAlt/>
    },
    {
        path: "/CollegeInfo",
        name: "College Info",
        icon: <FaSignOutAlt/>
    }
    
]

function Sidebar({children}){
    debugger;
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);
    let menuItemFinal = [];
    let tempmenu = []
    let loginType = localStorage.getItem("LoginType");
    
    tempmenu = ["Home","Admission","Programs Offered","Affiliated Colleges","Syllabus","Fee Structure","Holiday Calendar","Department","Pay Fees","Exam Time Table","Exam Result","Log In", "Registration", "College Info"]
    if(loginType === "1")
    {
        tempmenu = ["Home","Admission","Programs Offered","Affiliated Colleges","Syllabus","Fee Structure","Holiday Calendar","Certificate Verfication","Department",
        "Student Details","Student Attendance","Model Papers","Exam Evaluation","Student Profile","Document","Pay Fees","Exam Time Table","Exam Result","Hall Ticket Download",
        "Mark Sheet Download","Log out"]
    }
    else  if(loginType === "2" || loginType === "3")
    {
        tempmenu = ["Certificate Verfication","Department","Student Details","Student Attendance","Model Papers","Exam Evaluation","Document","Log out"]
    }
    else  if(loginType === "4")
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